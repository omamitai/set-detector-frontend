
// Updated DetectionResult interface to include the new metadata from our API
export interface DetectionResult {
  resultImage: string;
  status: "success" | "no_cards" | "no_sets" | "error";
  cardsDetected: number;
  setsFound: number;
  message: string;
}

// The Railway.app API endpoint
const API_BASE_URL = "https://set-detector-backend-production.up.railway.app";
const API_ENDPOINT = `${API_BASE_URL}/detect_sets`;
const MAX_RETRIES = 3;
const INITIAL_TIMEOUT = 60000; // 60 seconds

/**
 * Converts a base64 string to a blob URL for displaying images
 * @param base64Data Base64-encoded string (without data URI prefix)
 * @param contentType MIME type of the image
 * @returns URL for the blob
 */
function base64ToURL(base64Data: string, contentType: string = "image/jpeg"): string {
  try {
    // Convert base64 to binary
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    
    // Create blob and URL
    const blob = new Blob(byteArrays, { type: contentType });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error converting base64 to URL:", error);
    throw new Error("Failed to process the image data");
  }
}

/**
 * Sends an image to the SET detector API with retry logic
 * @param image The image file containing SET cards
 * @returns Processed image with detected set information and metadata
 */
export async function detectSets(image: File): Promise<DetectionResult> {
  let retryCount = 0;
  let lastError: Error | null = null;
  
  // Validate image before sending
  if (!image.type.startsWith("image/")) {
    throw new Error("Invalid file type. Please select an image.");
  }
  
  // Check file size (max 10MB)
  if (image.size > 10 * 1024 * 1024) {
    throw new Error("Image too large. Please select an image smaller than 10MB.");
  }
  
  while (retryCount < MAX_RETRIES) {
    try {
      // Create a FormData object to send the image
      const formData = new FormData();
      formData.append("file", image);
      
      console.log(`Sending image to API for processing (attempt ${retryCount + 1}/${MAX_RETRIES})...`);
      
      // Increase timeout slightly for each retry
      const timeout = INITIAL_TIMEOUT + (retryCount * 15000); // Add 15s per retry
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      // Make the request without showing toast
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
        signal: controller.signal,
        credentials: 'omit' // Don't include credentials with wildcard CORS
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        // Attempt to extract a detailed error message
        let errorMessage = `API error: ${response.status}`;
        try {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        } catch (e) {
          errorMessage = `API error: ${response.statusText || response.status}`;
        }
        throw new Error(errorMessage);
      }
      
      // Process successful response - now expecting JSON instead of blob
      const responseData = await response.json();
      
      // Validate the response structure
      if (!responseData || typeof responseData !== 'object') {
        throw new Error("Invalid response format received from server");
      }
      
      // Extract base64 image data and convert to URL
      const imageUrl = responseData.image_data 
        ? base64ToURL(responseData.image_data) 
        : '';
        
      // Return the processed result without showing toasts
      return {
        resultImage: imageUrl,
        status: responseData.status,
        cardsDetected: responseData.cards_detected,
        setsFound: responseData.sets_found,
        message: responseData.message
      };
      
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Error in detectSets function (attempt ${retryCount + 1}):`, error);
      
      // Handle specific error types without displaying toasts
      if (error instanceof DOMException && error.name === "AbortError") {
        lastError = new Error(`Request timed out after ${INITIAL_TIMEOUT + (retryCount * 15000)}ms. The server is taking longer than expected to respond.`);
      } else if (error instanceof TypeError && (error.message.includes("NetworkError") || error.message.includes("Failed to fetch"))) {
        lastError = new Error("Network error. This might be a connection problem. Please check your internet connection.");
      }
      
      // Increment retry counter
      retryCount++;
      
      // If we have more retries left, wait before retrying
      if (retryCount < MAX_RETRIES) {
        const waitTime = Math.min(2 ** retryCount * 1000, 10000); // Exponential backoff with max of 10s
        console.log(`Retrying in ${waitTime / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
  
  // If all retries are exhausted, throw the last encountered error
  if (lastError) {
    throw new Error(`Failed after ${MAX_RETRIES} attempts: ${lastError.message}`);
  } else {
    throw new Error(`Failed after ${MAX_RETRIES} attempts due to an unknown error.`);
  }
}

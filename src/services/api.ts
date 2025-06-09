
// Updated DetectionResult interface
export interface DetectionResult {
  resultImage: string;
  status: "success" | "no_cards" | "no_sets" | "error";
  cardsDetected: number;
  setsFound: number;
  message: string;
}

// Enhanced API configuration
const API_BASE_URL = "https://set-detector-backend-production.up.railway.app";
const API_ENDPOINT = `${API_BASE_URL}/detect_sets`;
const MAX_RETRIES = 3;
const INITIAL_TIMEOUT = 45000; // 45 seconds
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Enhanced base64 to URL conversion with better error handling
 */
function base64ToURL(base64Data: string, contentType: string = "image/jpeg"): string {
  try {
    // Validate base64 data
    if (!base64Data || typeof base64Data !== 'string') {
      throw new Error("Invalid base64 data provided");
    }
    
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
    
    const blob = new Blob(byteArrays, { type: contentType });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error converting base64 to URL:", error);
    throw new Error("Failed to process the image data");
  }
}

/**
 * Enhanced image validation
 */
function validateImage(image: File): void {
  if (!image || !(image instanceof File)) {
    throw new Error("Please select a valid image file.");
  }
  
  if (!image.type.startsWith("image/")) {
    throw new Error("Invalid file type. Please select an image file (JPEG, PNG, GIF, WebP, or HEIC).");
  }
  
  if (image.size > MAX_FILE_SIZE) {
    const sizeMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);
    throw new Error(`Image too large. Please select an image smaller than ${sizeMB}MB.`);
  }
  
  if (image.size === 0) {
    throw new Error("Image file appears to be corrupted or empty.");
  }
}

/**
 * Enhanced retry logic with exponential backoff
 */
async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Enhanced SET detection API with improved error handling and performance
 */
export async function detectSets(image: File): Promise<DetectionResult> {
  validateImage(image);
  
  let retryCount = 0;
  let lastError: Error | null = null;
  
  while (retryCount < MAX_RETRIES) {
    try {
      const formData = new FormData();
      formData.append("file", image);
      
      console.log(`Processing image (attempt ${retryCount + 1}/${MAX_RETRIES})...`);
      
      // Progressive timeout increase
      const timeout = INITIAL_TIMEOUT + (retryCount * 15000);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
        signal: controller.signal,
        credentials: 'omit',
        // Add cache control headers
        headers: {
          'Cache-Control': 'no-cache',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        let errorMessage = `Server error (${response.status})`;
        
        try {
          const errorText = await response.text();
          if (errorText && errorText.trim()) {
            errorMessage = errorText;
          } else {
            errorMessage = response.statusText || errorMessage;
          }
        } catch (e) {
          // Use status-based error messages
          switch (response.status) {
            case 413:
              errorMessage = "Image file is too large. Please try a smaller image.";
              break;
            case 415:
              errorMessage = "Unsupported image format. Please use JPEG, PNG, or WebP.";
              break;
            case 429:
              errorMessage = "Too many requests. Please wait a moment and try again.";
              break;
            case 500:
              errorMessage = "Server error. Please try again in a moment.";
              break;
            case 503:
              errorMessage = "Service temporarily unavailable. Please try again later.";
              break;
            default:
              errorMessage = `Server error (${response.status}). Please try again.`;
          }
        }
        
        throw new Error(errorMessage);
      }
      
      const responseData = await response.json();
      
      // Enhanced response validation
      if (!responseData || typeof responseData !== 'object') {
        throw new Error("Invalid response format received from server");
      }
      
      // Validate required fields
      if (typeof responseData.status !== 'string') {
        throw new Error("Invalid response: missing status field");
      }
      
      if (typeof responseData.cards_detected !== 'number') {
        throw new Error("Invalid response: missing cards detected count");
      }
      
      if (typeof responseData.sets_found !== 'number') {
        throw new Error("Invalid response: missing sets found count");
      }
      
      const imageUrl = responseData.image_data 
        ? base64ToURL(responseData.image_data) 
        : '';
        
      return {
        resultImage: imageUrl,
        status: responseData.status,
        cardsDetected: responseData.cards_detected,
        setsFound: responseData.sets_found,
        message: responseData.message || ""
      };
      
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Error processing image (attempt ${retryCount + 1}):`, error);
      
      // Enhanced error handling
      if (error instanceof DOMException && error.name === "AbortError") {
        lastError = new Error(`Request timed out after ${(INITIAL_TIMEOUT + (retryCount * 15000)) / 1000} seconds. Please try again with a smaller image.`);
      } else if (error instanceof TypeError && 
                 (error.message.includes("NetworkError") || 
                  error.message.includes("Failed to fetch") ||
                  error.message.includes("Load failed"))) {
        lastError = new Error("Network error. Please check your internet connection and try again.");
      }
      
      retryCount++;
      
      // Don't retry on certain errors
      if (lastError.message.includes("Invalid file type") ||
          lastError.message.includes("too large") ||
          lastError.message.includes("corrupted")) {
        break;
      }
      
      if (retryCount < MAX_RETRIES) {
        // Exponential backoff with jitter
        const baseWaitTime = Math.min(2 ** retryCount * 1000, 10000);
        const jitter = Math.random() * 1000;
        const waitTime = baseWaitTime + jitter;
        
        console.log(`Retrying in ${Math.round(waitTime / 1000)} seconds...`);
        await wait(waitTime);
      }
    }
  }
  
  if (lastError) {
    throw new Error(`Failed after ${MAX_RETRIES} attempts: ${lastError.message}`);
  } else {
    throw new Error(`Failed after ${MAX_RETRIES} attempts due to an unknown error.`);
  }
}

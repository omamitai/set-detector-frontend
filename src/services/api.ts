import { toast } from "sonner";

interface SetCard {
  Count: number;
  Color: string;
  Fill: string;
  Shape: string;
  Coordinates: number[];
}

interface SetInfo {
  set_indices: number[];
  cards: SetCard[];
}

interface DetectionResult {
  sets: SetInfo[];
  resultImage: string;
}

// Railway API response structure (matches our backend)
interface RailwayApiResponse {
  image: string;  // Base64 encoded image
  sets_found: Array<{
    set_id: number;
    cards: Array<{
      position: number;
      features: {
        number: string;
        color: string;
        shape: string;
        shading: string;
      }
    }>
  }>;
  all_cards: Array<{
    position: number;
    features: {
      number: string;
      color: string;
      shape: string;
      shading: string;
    }
  }>;
}

// The Railway.app API endpoint
const API_ENDPOINT = "https://set-game-api-production.up.railway.app/api/detect";
const MAX_RETRIES = 3;
const INITIAL_TIMEOUT = 60000; // 60 seconds

/**
 * Sends an image to the SET detector API with retry logic
 * @param image The image file containing SET cards
 * @returns Processed image with detected sets and card information
 */
export async function detectSets(image: File): Promise<DetectionResult> {
  let retryCount = 0;
  let lastError: Error | null = null;
  
  while (retryCount < MAX_RETRIES) {
    try {
      // Create a FormData object to send the image
      const formData = new FormData();
      formData.append("file", image);
      
      console.log(`Sending image to API for processing (attempt ${retryCount + 1}/${MAX_RETRIES})...`);
      
      // Add a timeout to the fetch request - increase timeout slightly for each retry
      const timeout = INITIAL_TIMEOUT + (retryCount * 15000); // Add 15s per retry
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      // Make the request
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
        signal: controller.signal,
        // Don't include credentials with wildcard CORS
        credentials: 'omit'
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        // Handle different error status codes
        let errorMessage = `API error: ${response.status}`;
        try {
          // Try to get more detailed error from response
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          // If can't parse JSON, use status text
          errorMessage = `API error: ${response.statusText || response.status}`;
        }
        
        throw new Error(errorMessage);
      }
      
      // Process successful response
      const data = await response.json() as RailwayApiResponse;
      
      // Check if we got the expected data
      if (!data.image || !data.sets_found) {
        throw new Error("Invalid response format from API. Missing required fields.");
      }
      
      // Transform the Railway API response into the format expected by the frontend
      return {
        sets: data.sets_found.map((setInfo) => {
          return {
            set_indices: setInfo.cards.map(card => card.position),
            cards: setInfo.cards.map((card) => {
              return {
                Count: parseInt(card.features.number),
                Color: card.features.color,
                Fill: card.features.shading,
                Shape: card.features.shape,
                // Use default coordinates since backend doesn't provide them
                Coordinates: [0, 0, 100, 100]
              };
            })
          };
        }),
        resultImage: `data:image/jpeg;base64,${data.image}`
      };
      
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Error in detectSets function (attempt ${retryCount + 1}):`, error);
      
      // Handle specific error types
      if (error instanceof DOMException && error.name === "AbortError") {
        lastError = new Error(`Request timed out after ${INITIAL_TIMEOUT + (retryCount * 15000)}ms. The server is taking longer than expected to respond.`);
      } else if (error instanceof TypeError && error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
        lastError = new Error("Network error. This might be a CORS issue or connection problem. Please check your browser console for details.");
      }
      
      // Increment retry counter
      retryCount++;
      
      // If we have more retries left, wait before retrying
      if (retryCount < MAX_RETRIES) {
        const waitTime = Math.min(2 ** retryCount * 1000, 10000); // Exponential backoff with max of 10s
        console.log(`Retrying in ${waitTime/1000} seconds...`);
        toast.info(`Processing taking longer than expected. Retrying... (${retryCount}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
  
  // If we've exhausted all retries, throw the last error
  if (lastError) {
    throw new Error(`Failed after ${MAX_RETRIES} attempts: ${lastError.message}`);
  } else {
    throw new Error(`Failed after ${MAX_RETRIES} attempts due to an unknown error.`);
  }
}

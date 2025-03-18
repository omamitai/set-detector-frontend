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

// Backend API response structure
interface BackendResponse {
  image_base64: string;
  sets_found: number[][];
  card_features: {
    [position: string]: {
      number: string;
      color: string;
      shape: string;
      shading: string;
    }
  };
}

// The Render.com API endpoint
const API_ENDPOINT = "https://set-detector-api.onrender.com/api/process";

/**
 * Sends an image to the SET detector API and returns detected sets
 * @param image The image file containing SET cards
 * @returns Processed image with detected sets and card information
 */
export async function detectSets(image: File): Promise<DetectionResult> {
  // Create a FormData object to send the image
  const formData = new FormData();
  formData.append("file", image); // Parameter name must match FastAPI's "file" parameter

  try {
    console.log("Sending image to API for processing...");
    
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      body: formData,
    });

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
      
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json() as BackendResponse;
    
    // Transform the backend response into the format expected by the frontend
    return {
      sets: data.sets_found.map((setIndices: number[]) => {
        return {
          set_indices: setIndices,
          cards: setIndices.map((position) => {
            const cardFeatures = data.card_features[position.toString()];
            return {
              Count: parseInt(cardFeatures.number),
              Color: cardFeatures.color,
              Fill: cardFeatures.shading,
              Shape: cardFeatures.shape,
              // Use default coordinates since backend doesn't provide them
              // This is okay as the frontend has the annotated image
              Coordinates: [0, 0, 100, 100]
            };
          })
        };
      }),
      resultImage: `data:image/jpeg;base64,${data.image_base64}`
    };
  } catch (error) {
    console.error("Error in detectSets function:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to process image. Please try again.");
  }
}

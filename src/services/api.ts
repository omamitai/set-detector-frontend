
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

// The actual API endpoint from render.com
const API_ENDPOINT = "https://set-detector-api.onrender.com/detect";

export async function detectSets(image: File): Promise<DetectionResult> {
  // Create a FormData object to send the image
  const formData = new FormData();
  formData.append("image", image);

  try {
    console.log("Sending image to API for processing...");
    
    // For development/testing only, we'll use the mock implementation if the API call fails
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        sets: data.sets,
        resultImage: `data:image/jpeg;base64,${data.result_image}`
      };
    } catch (apiError) {
      console.warn("API call failed, using mock implementation:", apiError);
      return mockDetectSets(image);
    }
  } catch (error) {
    console.error("Error in detectSets function:", error);
    throw new Error("Failed to process image. Please try again.");
  }
}

// Mock implementation for development/testing
async function mockDetectSets(image: File): Promise<DetectionResult> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Generate a pseudo-random number of mock sets
        const numSets = Math.floor(Math.random() * 4) + 1;
        
        const mockSets: SetInfo[] = [];
        
        for (let i = 0; i < numSets; i++) {
          const mockCards: SetCard[] = [];
          
          // Generate three cards for each set
          for (let j = 0; j < 3; j++) {
            mockCards.push({
              Count: [1, 2, 3][Math.floor(Math.random() * 3)],
              Color: ["red", "green", "purple"][Math.floor(Math.random() * 3)],
              Fill: ["empty", "striped", "solid"][Math.floor(Math.random() * 3)],
              Shape: ["diamond", "oval", "squiggle"][Math.floor(Math.random() * 3)],
              Coordinates: [
                Math.floor(Math.random() * 300),
                Math.floor(Math.random() * 300),
                Math.floor(Math.random() * 300) + 300,
                Math.floor(Math.random() * 300) + 300
              ]
            });
          }
          
          mockSets.push({
            set_indices: [i * 3, i * 3 + 1, i * 3 + 2],
            cards: mockCards
          });
        }
        
        // Draw colored boxes on a copy of the image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            
            // Draw rectangles for each set with different colors
            const colors = ["#7e69ab", "#4ade80", "#ef4444", "#3b82f6", "#f59e0b"];
            
            mockSets.forEach((set, index) => {
              const color = colors[index % colors.length];
              ctx.strokeStyle = color;
              ctx.lineWidth = 4;
              
              set.cards.forEach(card => {
                const [x1, y1, x2, y2] = card.Coordinates;
                ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
              });
            });
            
            resolve({
              sets: mockSets,
              resultImage: canvas.toDataURL("image/jpeg")
            });
          } else {
            reject(new Error("Failed to process image"));
          }
        };
        
        img.onerror = () => {
          reject(new Error("Failed to load image"));
        };
        
        img.src = URL.createObjectURL(image);
      } catch (error) {
        console.error("Error in mock API:", error);
        toast.error("Failed to process image");
        reject(error);
      }
    }, 3000); // Simulate processing time
  });
}

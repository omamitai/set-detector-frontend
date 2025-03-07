
import { toast } from "sonner";

// This is a mock API service for development
// In production, this would make calls to the Python backend

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

export async function detectSets(image: File): Promise<DetectionResult> {
  // In a real implementation, this would upload the image to the backend
  
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


import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, RefreshCw, Sparkles, Share2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
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

interface ResultsDisplayProps {
  resultImage: string | null;
  sets: SetInfo[];
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  resultImage,
  sets,
  onReset,
}) => {
  const isMobile = useIsMobile();
  
  const downloadImage = () => {
    if (!resultImage) return;
    
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = "set-detection-result.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Image saved successfully");
  };
  
  const shareImage = async () => {
    if (!resultImage || !navigator.share) {
      toast.error("Sharing not supported on this device");
      return;
    }
    
    try {
      // Convert blob URL to actual blob for sharing
      const response = await fetch(resultImage);
      const blob = await response.blob();
      const file = new File([blob], "set-detection.jpg", { type: "image/jpeg" });
      
      await navigator.share({
        title: "SET Game Detection",
        text: `I found ${sets.length} SET${sets.length !== 1 ? 's' : ''} in my game!`,
        files: [file]
      });
      
      toast.success("Shared successfully");
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share image");
    }
  };

  // Check if we have a valid result image but explicitly no sets
  const noSetsDetected = resultImage && sets && sets.length === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <div className="relative">
        <Card className="rounded-2xl overflow-hidden border border-gray-100 shadow-xl bg-white">
          <CardContent className="p-0 relative">
            {resultImage && (
              <div className="relative">
                {/* Sets found badge - only show when sets are found */}
                {sets && sets.length > 0 && (
                  <div className="absolute top-4 right-4 z-10">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <Badge 
                        className="bg-gradient-to-r from-set-purple to-set-purple-light text-white border-0 
                                 rounded-full px-4 py-1.5 shadow-md flex items-center gap-2"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-white/90" />
                        <span className="font-medium text-sm">
                          {sets.length} SET{sets.length !== 1 ? "s" : ""} detected
                        </span>
                      </Badge>
                    </motion.div>
                  </div>
                )}
                
                <div className="relative overflow-hidden flex justify-center">
                  <img
                    src={resultImage}
                    alt="Detected sets"
                    className="max-w-full h-auto object-contain max-h-[70vh] p-2"
                    loading="eager"
                  />
                </div>
                
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button
                    variant="ios"
                    size={isMobile ? "sm" : "default"}
                    onClick={onReset}
                    className="gap-1.5 rounded-full bg-white text-xs font-medium shadow-md hover:bg-gray-50"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-gray-700" />
                    <span className="font-medium text-gray-700">New Photo</span>
                  </Button>
                  
                  {/* Share button on supported devices */}
                  {navigator.share && (
                    <Button
                      variant="primary"
                      size={isMobile ? "sm" : "default"}
                      onClick={shareImage}
                      className="gap-1.5 rounded-full text-xs font-medium shadow-md"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      <span className="font-medium">Share</span>
                    </Button>
                  )}
                  
                  <Button
                    variant="primary"
                    size={isMobile ? "sm" : "default"}
                    onClick={downloadImage}
                    className="gap-1.5 rounded-full text-xs font-medium shadow-md"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="font-medium">Save</span>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Only show "No SET cards detected" message when explicitly confirmed */}
      {noSetsDetected && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col items-center justify-center p-2"
        >
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 shadow-md w-full max-w-sm">
            <p className="text-red-600 font-medium text-center text-sm">
              No SET cards detected in this image
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResultsDisplay;

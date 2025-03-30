
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, RefreshCw, Sparkles, Image as ImageIcon, Share2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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
  };

  const shareImage = async () => {
    if (!resultImage || !navigator.share) return;
    
    try {
      // Convert base64 to blob
      const response = await fetch(resultImage);
      const blob = await response.blob();
      const file = new File([blob], "set-detection.jpg", { type: "image/jpeg" });
      
      await navigator.share({
        title: "SET Game Analysis",
        text: `I found ${sets.length} SET${sets.length !== 1 ? 's' : ''} in my game!`,
        files: [file]
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <div className="relative">
        <Card className="rounded-lg overflow-hidden border-0 shadow-md">
          <CardContent className="p-0 relative">
            {resultImage && (
              <div className="relative">
                {/* Sets found badge - more sophisticated styling */}
                {sets.length > 0 && (
                  <div className="absolute top-3 right-3 z-10">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <Badge 
                        className="bg-[#5856D6]/90 text-white border-0 
                                 rounded-md px-3 py-1.5 shadow-sm flex items-center gap-2"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-white/90" />
                        <span className="font-medium text-sm">
                          {sets.length} SET{sets.length !== 1 ? "s" : ""} detected
                        </span>
                      </Badge>
                    </motion.div>
                  </div>
                )}
                
                <div className="relative overflow-hidden">
                  <img
                    src={resultImage}
                    alt="Detected sets"
                    className="w-full h-auto object-contain max-h-[70vh] p-2"
                  />
                  
                  {/* Very subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#5856D6]/5 via-transparent to-[#5856D6]/5 opacity-30 pointer-events-none"></div>
                </div>
                
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <Button
                    variant="secondary"
                    size={isMobile ? "sm" : "default"}
                    onClick={onReset}
                    className="gap-1.5 rounded-md bg-white/90 backdrop-blur-sm text-xs font-medium shadow-sm
                              hover:bg-white hover:shadow-md transition-all duration-300 border-0"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-[#1C1C1E]" />
                    <span className="font-medium text-[#1C1C1E]">New Photo</span>
                  </Button>
                  
                  {navigator.share && (
                    <Button
                      variant="default"
                      size={isMobile ? "sm" : "default"}
                      onClick={shareImage}
                      className="gap-1.5 rounded-md bg-[#5856D6] text-white text-xs font-medium shadow-sm
                                hover:bg-[#5856D6]/90 hover:shadow-md transition-all duration-300 border-0"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      <span className="font-medium">Share</span>
                    </Button>
                  )}
                  
                  <Button
                    variant="default"
                    size={isMobile ? "sm" : "default"}
                    onClick={downloadImage}
                    className="gap-1.5 rounded-md bg-[#5856D6] text-white text-xs font-medium shadow-sm
                              hover:bg-[#5856D6]/90 hover:shadow-md transition-all duration-300 border-0"
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
      
      {sets.length === 0 && resultImage && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col items-center justify-center p-2"
        >
          <div className="bg-[#FFF5F5] border border-[#D06175]/10 rounded-md p-3 shadow-sm w-full max-w-sm">
            <p className="text-[#D06175] font-medium text-center text-sm">
              No SET cards detected in this image
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResultsDisplay;

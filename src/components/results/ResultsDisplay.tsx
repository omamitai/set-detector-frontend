
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
        <Card className="rounded-3xl overflow-hidden border-0 shadow-xl">
          <CardContent className="p-0 relative">
            {resultImage && (
              <div className="relative">
                {/* Sets found badge - positioned at top right corner with improved styling */}
                {sets.length > 0 && (
                  <div className="absolute top-4 right-4 z-10">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <Badge 
                        className="bg-gradient-to-r from-set-purple to-set-purple/90 text-white border-0 
                                 rounded-full px-4 py-2 shadow-lg flex items-center gap-2 font-medium"
                      >
                        <Sparkles className="h-4 w-4 text-white animate-pulse" />
                        <span className="font-poppins">
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
                  
                  {/* Subtle glow effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-set-purple/10 via-transparent to-set-green/10 opacity-60 pointer-events-none"></div>
                </div>
                
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size={isMobile ? "sm" : "default"}
                    onClick={onReset}
                    className="gap-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium shadow-lg
                              hover:bg-white hover:shadow-xl transition-all duration-300 border-0"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-[#1C1C1E]" />
                    <span className="font-medium text-[#1C1C1E]">New Photo</span>
                  </Button>
                  
                  {navigator.share && (
                    <Button
                      variant="default"
                      size={isMobile ? "sm" : "default"}
                      onClick={shareImage}
                      className="gap-1.5 rounded-full bg-set-green text-white text-xs font-medium shadow-lg
                                hover:bg-set-green/90 hover:shadow-xl transition-all duration-300 border-0"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      <span className="font-medium">Share</span>
                    </Button>
                  )}
                  
                  <Button
                    variant="default"
                    size={isMobile ? "sm" : "default"}
                    onClick={downloadImage}
                    className="gap-1.5 rounded-full bg-set-purple text-white text-xs font-medium shadow-lg
                              hover:bg-set-purple/90 hover:shadow-xl transition-all duration-300 border-0"
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
          <div className="bg-[#FFEBE9] border border-[#FF453A]/20 rounded-xl p-4 shadow-md w-full max-w-sm">
            <p className="text-[#FF453A] font-medium text-center font-sans">
              No SET cards detected in this image
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResultsDisplay;

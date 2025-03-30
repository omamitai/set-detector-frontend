
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, RefreshCw, Sparkles, Image as ImageIcon
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="relative">
        <Card className="ios-card overflow-hidden border-0">
          <CardContent className="p-0 relative">
            {resultImage && (
              <div className="relative">
                {/* Sets found badge - moved to top right corner with improved styling */}
                {sets.length > 0 && (
                  <div className="absolute top-3 right-3 z-10">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <Badge 
                        className="bg-[#5856D6]/90 text-white border-0 rounded-full px-3.5 py-1.5 
                                 shadow-md flex items-center gap-1.5"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-[#C7C2F9]" />
                        <span className="sf-pro-display font-medium text-xs">
                          {sets.length} SET{sets.length !== 1 ? "s" : ""} detected
                        </span>
                      </Badge>
                    </motion.div>
                  </div>
                )}
                
                <img
                  src={resultImage}
                  alt="Detected sets"
                  className="w-full h-auto object-contain max-h-[70vh] px-2 py-3"
                />
                
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <Button
                    variant="secondary"
                    size={isMobile ? "sm" : "default"}
                    onClick={onReset}
                    className="gap-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium shadow-md
                              hover:bg-white hover:shadow-lg transition-all duration-300 border-0"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-[#1C1C1E]" />
                    <span className="sf-pro-text text-[#1C1C1E]">New</span>
                  </Button>
                  
                  <Button
                    variant="default"
                    size={isMobile ? "sm" : "default"}
                    onClick={downloadImage}
                    className="gap-1.5 rounded-full bg-[#5856D6]/90 backdrop-blur-sm text-xs font-medium shadow-md
                              hover:bg-[#5856D6] hover:shadow-lg transition-all duration-300 border-0"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="sf-pro-text">Save</span>
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
          <div className="bg-[#FFEBE9] border border-[#FF453A]/20 rounded-xl p-3.5 shadow-sm w-full max-w-sm">
            <p className="text-[#FF453A] sf-pro-text text-sm font-medium text-center">
              No SET cards detected in this image
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResultsDisplay;

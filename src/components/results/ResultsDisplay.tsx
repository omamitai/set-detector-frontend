
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
        <Card className="ios-card overflow-hidden">
          <CardContent className="p-0 relative">
            {resultImage && (
              <div className="relative">
                {/* Sets found badge - shown on top of image */}
                {sets.length > 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    <Badge 
                      className="bg-set-purple/95 text-white border-0 rounded-full px-3 py-1.5 
                              shadow-lg flex items-center gap-1.5"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span className="sf-pro-display font-medium text-xs">
                        {sets.length} SET{sets.length !== 1 ? "s" : ""} detected
                      </span>
                    </Badge>
                  </div>
                )}
                
                <img
                  src={resultImage}
                  alt="Detected sets"
                  className="w-full h-auto object-contain max-h-[70vh] p-4"
                />
                
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <Button
                    variant="secondary"
                    size={isMobile ? "sm" : "default"}
                    onClick={onReset}
                    className="gap-1 rounded-full bg-background/90 backdrop-blur-sm text-xs shadow-md"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span className="sf-pro-text">New</span>
                  </Button>
                  
                  <Button
                    variant="default"
                    size={isMobile ? "sm" : "default"}
                    onClick={downloadImage}
                    className="gap-1 rounded-full bg-primary/90 backdrop-blur-sm text-xs shadow-md"
                  >
                    <Download className="h-3 w-3" />
                    <span className="sf-pro-text">Save</span>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {sets.length === 0 && resultImage && (
        <div className="flex flex-col items-center justify-center p-4">
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 shadow-sm w-full max-w-sm">
            <p className="text-orange-600 sf-pro-text text-sm font-medium text-center">
              No SET cards detected in this image
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ResultsDisplay;


import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, RefreshCw, Sparkles
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
      className="space-y-5"
    >
      <div className="relative">
        <Card className="rounded-2xl overflow-hidden border border-gray-100 shadow-xl bg-white">
          <CardContent className="p-0 relative">
            {resultImage && (
              <div className="relative">
                {/* Sets found badge - more sophisticated styling */}
                {sets.length > 0 && (
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
                
                <div className="relative overflow-hidden">
                  <img
                    src={resultImage}
                    alt="Detected sets"
                    className="w-full h-auto object-contain max-h-[70vh] p-2"
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
      
      {sets.length === 0 && resultImage && (
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

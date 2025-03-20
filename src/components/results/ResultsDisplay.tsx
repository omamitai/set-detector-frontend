
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, RefreshCw, Eye, Sparkles, Image as ImageIcon
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
      className="space-y-4 md:space-y-6"
    >
      <div className="relative">
        <Card className="ios-card overflow-hidden">
          <CardHeader className="p-3 md:p-4 pb-0">
            <CardTitle className="text-base md:text-lg flex justify-between items-center sf-pro-display">
              <span className="flex items-center">
                <Eye className="h-4 w-4 text-primary mr-2" />
                Results
              </span>
              
              {sets.length > 0 && !isMobile && (
                <Badge className="bg-set-purple text-white border-0 rounded-full px-3 py-1 shadow-sm text-sm inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span className="sf-pro-display font-medium">{sets.length} {sets.length === 1 ? "SET" : "SETs"} detected</span>
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 relative">
            {resultImage && (
              <div className="relative overflow-hidden">
                <img
                  src={resultImage}
                  alt="Detected sets"
                  className={`w-full h-auto object-contain max-h-[70vh] ${isMobile ? 'p-3' : 'p-4'}`}
                />
                
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <Button
                    variant="secondary"
                    size={isMobile ? "sm" : "default"}
                    onClick={onReset}
                    className="gap-1 rounded-full bg-background/90 backdrop-blur-sm text-xs md:text-sm shadow-md"
                  >
                    <RefreshCw className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    <span className="sf-pro-text">New</span>
                  </Button>
                  
                  <Button
                    variant="default"
                    size={isMobile ? "sm" : "default"}
                    onClick={downloadImage}
                    className="gap-1 rounded-full bg-primary/90 backdrop-blur-sm text-xs md:text-sm shadow-md"
                  >
                    <Download className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    <span className="sf-pro-text">Save</span>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {sets.length > 0 && isMobile && (
          <div className="mt-4 px-1">
            <Badge 
              className="bg-set-purple/95 text-white border-0 rounded-xl px-4 py-2.5 
                      text-sm shadow-md w-full justify-center flex items-center"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="sf-pro-display font-medium">
                {sets.length} {sets.length === 1 ? "SET" : "SETs"} detected
              </span>
            </Badge>
          </div>
        )}
      </div>
      
      {sets.length === 0 && resultImage && (
        <div className="flex flex-col items-center justify-center p-4">
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 shadow-sm w-full max-w-sm">
            <div className="text-orange-500 mb-2">
              <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.995 16H12.004" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-gray-700 sf-pro-text text-sm font-medium text-center">
              No SET cards detected
            </p>
            <p className="text-gray-500 sf-pro-text text-xs mt-1 text-center">
              Please try taking a clearer picture of your SET game board
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ResultsDisplay;

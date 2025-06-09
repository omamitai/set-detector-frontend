
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

interface ResultsDisplayProps {
  resultImage: string | null;
  status: "success" | "no_cards" | "no_sets" | "error" | null;
  cardsDetected: number;
  setsFound: number;
  message: string;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  resultImage,
  status,
  cardsDetected,
  setsFound,
  message,
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
      const response = await fetch(resultImage);
      const blob = await response.blob();
      const file = new File([blob], "set-detection.jpg", { type: "image/jpeg" });
      
      await navigator.share({
        title: "SET Game Detection",
        text: `I found ${setsFound} SET${setsFound !== 1 ? 's' : ''} in my game!`,
        files: [file]
      });
      
      toast.success("Shared successfully");
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share image");
    }
  };

  // Generate whimsical messages based on status
  const getWhimsicalMessage = () => {
    if (status === "no_cards") {
      return "Hmm, are you certain you snapped a SET board? I see no cards here!";
    } else if (status === "no_sets" || (cardsDetected > 0 && setsFound === 0)) {
      return "Cards detected, but no SETs found—better luck next time!";
    } else if (status === "success" && setsFound > 0) {
      return `Eureka! Found ${setsFound} SET${setsFound !== 1 ? 's' : ''} in your game!`;
    } else if (status === "error") {
      return "Oops! Something went wrong. Maybe try another photo?";
    }
    return "";
  };

  const whimsicalMessage = getWhimsicalMessage();
  const isNoCardsDetected = status === "no_cards";
  const isNoSetsFound = status === "no_sets" || (cardsDetected > 0 && setsFound === 0);
  const isSuccess = status === "success" && setsFound > 0;
  const isError = status === "error";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Main result image */}
      <div className="relative">
        <Card className="rounded-2xl overflow-hidden border border-gray-100 shadow-xl bg-white">
          <CardContent className="p-0 relative">
            {resultImage && (
              <div className="relative">
                <div className="relative overflow-hidden flex justify-center">
                  <img
                    src={resultImage}
                    alt="SET detection results"
                    className="max-w-full h-auto object-contain max-h-[70vh] p-2"
                    loading="eager"
                  />
                </div>
                
                {/* Action buttons overlay */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button
                    variant="ios"
                    size={isMobile ? "sm" : "default"}
                    onClick={onReset}
                    className="gap-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium shadow-md hover:bg-gray-50 transition-all"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-gray-700" />
                    <span className="font-medium text-gray-700">New Photo</span>
                  </Button>
                  
                  {navigator.share && (
                    <Button
                      variant="primary"
                      size={isMobile ? "sm" : "default"}
                      onClick={shareImage}
                      className="gap-1.5 rounded-full text-xs font-medium shadow-md transition-all"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      <span className="font-medium">Share</span>
                    </Button>
                  )}
                  
                  <Button
                    variant="primary"
                    size={isMobile ? "sm" : "default"}
                    onClick={downloadImage}
                    className="gap-1.5 rounded-full text-xs font-medium shadow-md transition-all"
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
      
      {/* Whimsical message display */}
      {whimsicalMessage && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-col items-center justify-center p-2"
        >
          <div className={`
            ${isNoCardsDetected || isError ? 'bg-red-50 border-red-100' : 
              isNoSetsFound ? 'bg-amber-50 border-amber-100' : 
              'bg-green-50 border-green-100'} 
            border rounded-xl p-4 shadow-sm w-full max-w-sm transition-all
          `}>
            <p className={`
              ${isNoCardsDetected || isError ? 'text-red-600' : 
                isNoSetsFound ? 'text-amber-600' : 
                'text-green-600'} 
              font-medium text-center text-sm
            `}>
              {whimsicalMessage}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResultsDisplay;

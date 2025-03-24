
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import ImageUpload from "@/components/upload/ImageUpload";
import ResultsDisplay from "@/components/results/ResultsDisplay";
import HowItWorks from "@/components/info/HowItWorks";
import { detectSets } from "@/services/api";
import { AlertCircle, RefreshCw, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

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

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [detectedSets, setDetectedSets] = useState<SetInfo[]>([]);
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleImageSelected = async (file: File) => {
    try {
      setIsProcessing(true);
      setError(null);
      // Removed toast notification
      
      const result = await detectSets(file);
      
      setResultImage(result.resultImage);
      setDetectedSets(result.sets);
      setActiveTab("results");
      
      // Removed toast notifications
    } catch (error) {
      console.error("Error processing image:", error);
      
      // Check if the error contains "No cards detected"
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes("No cards detected")) {
        setError("Couldn't detect any SET cards in your image. Are you sure this is a SET board? Try taking a clearer picture with good lighting.");
      } else {
        setError(errorMessage);
      }
      
      // Removed toast notification
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setResultImage(null);
    setDetectedSets([]);
    setActiveTab("upload");
    setError(null);
  };

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-3 md:px-6 py-3 md:py-6"
      >
        <motion.div 
          className={`text-center mb-4 ${isMobile ? 'mt-3 mb-4' : 'md:mb-6'}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-2 text-gray-900 sf-pro-display`}>
            SET Game Detector
          </h1>
          <p className="text-muted-foreground mb-2 max-w-lg mx-auto sf-pro-text text-sm md:text-base">
            Upload a photo of your SET game layout
          </p>
        </motion.div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive" className="mb-4 max-w-md mx-auto bg-orange-50 border-orange-100 text-orange-800">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <AlertTitle className="text-orange-700">No SET Cards Detected</AlertTitle>
              <AlertDescription className="flex flex-col gap-2 text-orange-600">
                <span>{error}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleReset} 
                  className="self-end flex items-center gap-1 border-orange-200 text-orange-700 hover:bg-orange-100"
                >
                  <RefreshCw className="h-3 w-3" />
                  Try again
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
        
        <div className="max-w-md mx-auto md:max-w-4xl">
          {activeTab === "upload" ? (
            <div className="flex flex-col gap-4">
              <div className={`mx-auto w-full ${isMobile ? 'mt-0' : 'ios-spacing'}`}>
                <ImageUpload 
                  onImageSelected={handleImageSelected}
                  isProcessing={isProcessing}
                />
              </div>
              
              <div className="mt-6 md:mt-10 w-full">
                <HowItWorks />
              </div>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              <ResultsDisplay
                resultImage={resultImage}
                sets={detectedSets}
                onReset={handleReset}
              />
              
              <div className="mt-6 md:mt-12 pb-8 md:pb-16">
                <HowItWorks />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default Index;


import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ImageUpload from "@/components/upload/ImageUpload";
import ResultsDisplay from "@/components/results/ResultsDisplay";
import HowItWorks from "@/components/info/HowItWorks";
import { detectSets } from "@/services/api";
import { AlertCircle, RefreshCw, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
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

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [detectedSets, setDetectedSets] = useState<SetInfo[]>([]);
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Check for saved results when component mounts
  useEffect(() => {
    const savedImage = localStorage.getItem('setDetectorResultImage');
    const savedSets = localStorage.getItem('setDetectorSets');
    
    if (savedImage) {
      setResultImage(savedImage);
      if (savedSets) {
        try {
          setDetectedSets(JSON.parse(savedSets));
        } catch (e) {
          console.error("Error parsing saved sets:", e);
          setDetectedSets([]);
        }
      }
      setActiveTab("results");
    }
  }, []);

  const handleImageSelected = async (file: File) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const result = await detectSets(file);
      
      // Save results to localStorage for persistence
      localStorage.setItem('setDetectorResultImage', result.resultImage);
      
      setResultImage(result.resultImage);
      
      // Handle potential undefined sets in API response
      if (result.sets) {
        setDetectedSets(result.sets);
        localStorage.setItem('setDetectorSets', JSON.stringify(result.sets));
      } else {
        setDetectedSets([]);
        localStorage.setItem('setDetectorSets', JSON.stringify([]));
      }
      
      setActiveTab("results");
      toast.success("Image processed successfully!");
      
    } catch (error) {
      console.error("Error processing image:", error);
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes("No cards detected")) {
        setError("Couldn't detect any SET cards in your image. Are you sure this is a SET board? Try taking a clearer picture with good lighting.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setResultImage(null);
    setDetectedSets([]);
    setActiveTab("upload");
    setError(null);
    
    // Clear saved results
    localStorage.removeItem('setDetectorResultImage');
    localStorage.removeItem('setDetectorSets');
  };

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8"
      >
        <motion.div 
          className="text-center mb-6"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl md:text-3xl font-semibold mb-3 bg-gradient-to-r from-set-red via-set-purple to-set-green bg-clip-text text-transparent font-poppins">
            SET Game Detector
          </h1>
          <p className="text-gray-500 max-w-md mx-auto text-sm md:text-base">
            Instantly spot every SET card combination
          </p>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive" className="mb-6 max-w-md mx-auto bg-white border border-red-100 text-red-600 shadow-sm rounded-xl">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <AlertTitle className="text-red-600 font-medium">No SET Cards Detected</AlertTitle>
                <AlertDescription className="flex flex-col gap-2 text-red-500">
                  <span>{error}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleReset} 
                    className="self-end flex items-center gap-1 border-red-100 text-red-600 hover:bg-white/80 rounded-md"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Try again
                  </Button>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="max-w-md mx-auto md:max-w-4xl">
          <AnimatePresence mode="wait">
            {activeTab === "upload" ? (
              <motion.div 
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mx-auto w-full"
                >
                  <ImageUpload 
                    onImageSelected={handleImageSelected}
                    isProcessing={isProcessing}
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-full"
                >
                  <HowItWorks />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <ResultsDisplay
                    resultImage={resultImage}
                    sets={detectedSets}
                    onReset={handleReset}
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <HowItWorks />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Index;

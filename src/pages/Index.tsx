
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
      
      const result = await detectSets(file);
      
      setResultImage(result.resultImage);
      setDetectedSets(result.sets);
      setActiveTab("results");
      
    } catch (error) {
      console.error("Error processing image:", error);
      
      // Check if the error contains "No cards detected"
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
  };

  // Container variants for motion animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-3 md:px-6 py-3 md:py-6"
      >
        <motion.div 
          className={`text-center ${isMobile ? 'mt-1 mb-3' : 'mt-2 mb-6'}`}
          initial={itemVariants.hidden}
          animate={itemVariants.visible}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-2 text-set-dark sf-pro-display tracking-tight`}>
            SET Game Detector
          </h1>
          <p className="text-set-gray mb-2 max-w-lg mx-auto sf-pro-text text-sm md:text-base">
            Upload a photo of your SET game layout
          </p>
        </motion.div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive" className="mb-4 max-w-md mx-auto bg-[#FFEBE9] border-[#FF453A]/20 text-[#FF453A] shadow-sm">
              <AlertTriangle className="h-4 w-4 text-[#FF453A]" />
              <AlertTitle className="text-[#FF453A] font-medium">No SET Cards Detected</AlertTitle>
              <AlertDescription className="flex flex-col gap-2 text-[#FF453A]/90">
                <span>{error}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleReset} 
                  className="self-end flex items-center gap-1 border-[#FF453A]/20 text-[#FF453A] hover:bg-[#FFEBE9]/80"
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
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4"
            >
              <motion.div 
                variants={itemVariants}
                className={`mx-auto w-full ${isMobile ? 'mt-0' : 'ios-spacing'}`}
              >
                <ImageUpload 
                  onImageSelected={handleImageSelected}
                  isProcessing={isProcessing}
                />
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="mt-4 md:mt-8 w-full"
              >
                <HowItWorks />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 md:space-y-6"
            >
              <motion.div variants={itemVariants}>
                <ResultsDisplay
                  resultImage={resultImage}
                  sets={detectedSets}
                  onReset={handleReset}
                />
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="mt-4 md:mt-8 pb-6 md:pb-12"
              >
                <HowItWorks />
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default Index;

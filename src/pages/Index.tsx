
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import ImageUpload from "@/components/upload/ImageUpload";
import ResultsDisplay from "@/components/results/ResultsDisplay";
import HowItWorks from "@/components/info/HowItWorks";
import { detectSets } from "@/services/api";
import { AlertCircle, RefreshCw, AlertTriangle, Camera, Image as ImageIcon } from "lucide-react";
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

  // Cards animation for hero section
  const cards = [
    { symbol: "◇", color: "text-[#5856D6]", animationDelay: 0, rotate: "-3deg", translateY: "-5px" },
    { symbol: "○", color: "text-[#D06175]", animationDelay: 0.2, rotate: "2deg", translateY: "0px" },
    { symbol: "△", color: "text-[#4A8072]", animationDelay: 0.4, rotate: "5deg", translateY: "-3px" },
  ];

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-8"
      >
        {/* Hero section with floating cards */}
        <motion.div 
          className="text-center mb-6 md:mb-10 relative"
          initial={itemVariants.hidden}
          animate={itemVariants.visible}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative flex justify-center mb-4">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className={`absolute ${card.color} text-4xl md:text-5xl font-bold`}
                style={{ 
                  transform: `rotate(${card.rotate}) translateY(${card.translateY})`,
                  zIndex: 10 - index
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: card.animationDelay, duration: 0.5 }
                }}
                whileHover={{ scale: 1.1, rotate: '0deg' }}
              >
                {card.symbol}
              </motion.div>
            ))}
            <div className="h-16 md:h-20"></div> {/* Spacer for floating cards */}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-gray-800 font-poppins tracking-tight">
            SET Game Detector
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto font-sans text-base md:text-lg">
            Instantly spot every SET. Just snap, and play smarter.
          </p>
        </motion.div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive" className="mb-6 max-w-md mx-auto bg-[#FFF5F5] border-[#D06175]/20 text-[#D06175] shadow-sm">
              <AlertTriangle className="h-4 w-4 text-[#D06175]" />
              <AlertTitle className="text-[#D06175] font-medium">No SET Cards Detected</AlertTitle>
              <AlertDescription className="flex flex-col gap-2 text-[#D06175]/90">
                <span>{error}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleReset} 
                  className="self-end flex items-center gap-1 border-[#D06175]/20 text-[#D06175] hover:bg-[#FFF5F5]/80"
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
              className="flex flex-col gap-8"
            >
              <motion.div 
                variants={itemVariants}
                className="mx-auto w-full"
              >
                <ImageUpload 
                  onImageSelected={handleImageSelected}
                  isProcessing={isProcessing}
                />
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="w-full"
              >
                <HowItWorks />
              </motion.div>
              
              {/* Sticky bottom CTA for mobile */}
              {isMobile && (
                <motion.div 
                  className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md shadow-lg border-t z-50"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="flex gap-3 max-w-md mx-auto">
                    <Button 
                      onClick={() => {
                        const fileInput = document.querySelector('input[capture="environment"]') as HTMLInputElement;
                        if (fileInput) fileInput.click();
                      }}
                      className="flex-1 bg-[#5856D6] text-white gap-2 rounded-xl h-12"
                    >
                      <Camera className="h-4 w-4" />
                      Take Photo
                    </Button>
                    
                    <Button 
                      onClick={() => {
                        const fileInput = document.querySelector('input[type="file"]:not([capture])') as HTMLInputElement;
                        if (fileInput) fileInput.click();
                      }}
                      variant="outline"
                      className="flex-1 border-[#5856D6]/20 text-[#5856D6] gap-2 rounded-xl h-12"
                    >
                      <ImageIcon className="h-4 w-4" />
                      Gallery
                    </Button>
                  </div>
                  <div className="h-safe-bottom"></div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8 md:space-y-10 pb-16 md:pb-20"
            >
              <motion.div variants={itemVariants}>
                <ResultsDisplay
                  resultImage={resultImage}
                  sets={detectedSets}
                  onReset={handleReset}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
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

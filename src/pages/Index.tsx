
import React, { useState, useEffect, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import ImageUpload from "@/components/upload/ImageUpload";
import ResultsDisplay from "@/components/results/ResultsDisplay";
import HowItWorks from "@/components/info/HowItWorks";
import { detectSets } from "@/services/api";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [status, setStatus] = useState<"success" | "no_cards" | "no_sets" | "error" | null>(null);
  const [cardsDetected, setCardsDetected] = useState(0);
  const [setsFound, setSetsFound] = useState(0);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  
  // Memoize active tab calculation
  const activeTab = useMemo(() => {
    return resultImage ? "results" : "upload";
  }, [resultImage]);
  
  // Load saved results on component mount with error handling
  useEffect(() => {
    try {
      const savedImage = localStorage.getItem('setDetectorResultImage');
      const savedStatus = localStorage.getItem('setDetectorStatus');
      const savedCardsDetected = localStorage.getItem('setDetectorCardsDetected');
      const savedSetsFound = localStorage.getItem('setDetectorSetsFound');
      const savedMessage = localStorage.getItem('setDetectorMessage');
      
      if (savedImage && savedStatus) {
        setResultImage(savedImage);
        setStatus(savedStatus as "success" | "no_cards" | "no_sets" | "error");
        setCardsDetected(parseInt(savedCardsDetected || '0', 10));
        setSetsFound(parseInt(savedSetsFound || '0', 10));
        setMessage(savedMessage || '');
      }
    } catch (error) {
      console.error("Error loading saved results:", error);
      // Clear corrupted localStorage data
      localStorage.removeItem('setDetectorResultImage');
      localStorage.removeItem('setDetectorStatus');
      localStorage.removeItem('setDetectorCardsDetected');
      localStorage.removeItem('setDetectorSetsFound');
      localStorage.removeItem('setDetectorMessage');
    }
  }, []);

  const handleImageSelected = async (file: File) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const result = await detectSets(file);
      
      // Save results to localStorage with error handling
      try {
        localStorage.setItem('setDetectorResultImage', result.resultImage);
        localStorage.setItem('setDetectorStatus', result.status);
        localStorage.setItem('setDetectorCardsDetected', result.cardsDetected.toString());
        localStorage.setItem('setDetectorSetsFound', result.setsFound.toString());
        localStorage.setItem('setDetectorMessage', result.message);
      } catch (storageError) {
        console.warn("Could not save to localStorage:", storageError);
      }
      
      setResultImage(result.resultImage);
      setStatus(result.status);
      setCardsDetected(result.cardsDetected);
      setSetsFound(result.setsFound);
      setMessage(result.message);
      
    } catch (error) {
      console.error("Error processing image:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setResultImage(null);
    setStatus(null);
    setCardsDetected(0);
    setSetsFound(0);
    setMessage("");
    setError(null);
    
    // Clear localStorage with error handling
    try {
      localStorage.removeItem('setDetectorResultImage');
      localStorage.removeItem('setDetectorStatus');
      localStorage.removeItem('setDetectorCardsDetected');
      localStorage.removeItem('setDetectorSetsFound');
      localStorage.removeItem('setDetectorMessage');
    } catch (error) {
      console.warn("Could not clear localStorage:", error);
    }
  };

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8"
      >
        {/* Enhanced header with better typography */}
        <motion.div 
          className="text-center mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-set-red via-set-purple to-set-green bg-clip-text text-transparent font-poppins leading-tight">
            SET Game Detector
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Instantly spot every SET card combination in your game with AI-powered detection
          </p>
        </motion.div>
        
        {/* Enhanced error alert */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Alert variant="destructive" className="mb-8 max-w-lg mx-auto bg-white/95 backdrop-blur-sm border-2 border-red-100 text-red-600 shadow-xl rounded-2xl">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <AlertTitle className="text-red-600 font-semibold text-lg">Processing Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4 text-red-500">
                  <span className="text-sm leading-relaxed">{error}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleReset} 
                    className="self-end flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl transition-all hover:scale-105"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Enhanced main content with smoother transitions */}
        <div className="max-w-md mx-auto md:max-w-5xl">
          <AnimatePresence mode="wait">
            {activeTab === "upload" ? (
              <motion.div 
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-16"
              >
                <ImageUpload 
                  onImageSelected={handleImageSelected}
                  isProcessing={isProcessing}
                />
                <HowItWorks />
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-16"
              >
                <ResultsDisplay
                  resultImage={resultImage}
                  status={status}
                  cardsDetected={cardsDetected}
                  setsFound={setsFound}
                  message={message}
                  onReset={handleReset}
                />
                <HowItWorks />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Index;

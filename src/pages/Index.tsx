
import React, { useState, useEffect } from "react";
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
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [error, setError] = useState<string | null>(null);
  
  // Load saved results on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem('setDetectorResultImage');
    const savedStatus = localStorage.getItem('setDetectorStatus');
    const savedCardsDetected = localStorage.getItem('setDetectorCardsDetected');
    const savedSetsFound = localStorage.getItem('setDetectorSetsFound');
    const savedMessage = localStorage.getItem('setDetectorMessage');
    
    if (savedImage) {
      setResultImage(savedImage);
      setStatus(savedStatus as "success" | "no_cards" | "no_sets" | "error");
      setCardsDetected(parseInt(savedCardsDetected || '0', 10));
      setSetsFound(parseInt(savedSetsFound || '0', 10));
      setMessage(savedMessage || '');
      setActiveTab("results");
    }
  }, []);

  const handleImageSelected = async (file: File) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const result = await detectSets(file);
      
      // Save results to localStorage
      localStorage.setItem('setDetectorResultImage', result.resultImage);
      localStorage.setItem('setDetectorStatus', result.status);
      localStorage.setItem('setDetectorCardsDetected', result.cardsDetected.toString());
      localStorage.setItem('setDetectorSetsFound', result.setsFound.toString());
      localStorage.setItem('setDetectorMessage', result.message);
      
      setResultImage(result.resultImage);
      setStatus(result.status);
      setCardsDetected(result.cardsDetected);
      setSetsFound(result.setsFound);
      setMessage(result.message);
      setActiveTab("results");
      
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
    setActiveTab("upload");
    setError(null);
    
    // Clear localStorage
    localStorage.removeItem('setDetectorResultImage');
    localStorage.removeItem('setDetectorStatus');
    localStorage.removeItem('setDetectorCardsDetected');
    localStorage.removeItem('setDetectorSetsFound');
    localStorage.removeItem('setDetectorMessage');
  };

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8"
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-set-red via-set-purple to-set-green bg-clip-text text-transparent font-poppins">
            SET Game Detector
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base">
            Instantly spot every SET card combination in your game
          </p>
        </motion.div>
        
        {/* Error Alert */}
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
                <AlertTitle className="text-red-600 font-medium">Processing Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-3 text-red-500">
                  <span className="text-sm">{error}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleReset} 
                    className="self-end flex items-center gap-1.5 border-red-100 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Try Again
                  </Button>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main Content */}
        <div className="max-w-md mx-auto md:max-w-4xl">
          <AnimatePresence mode="wait">
            {activeTab === "upload" ? (
              <motion.div 
                key="upload"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
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

import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import ImageUpload from "@/components/upload/ImageUpload";
import ResultsDisplay from "@/components/results/ResultsDisplay";
import HowItWorks from "@/components/info/HowItWorks";
import { detectSets } from "@/services/api";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
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
  const handleImageSelected = async (file: File) => {
    try {
      setIsProcessing(true);
      setError(null);
      toast.info("Processing image...");
      const result = await detectSets(file);
      setResultImage(result.resultImage);
      setDetectedSets(result.sets);
      setActiveTab("results");
      if (result.sets.length > 0) {
        toast.success(`Found ${result.sets.length} SET${result.sets.length > 1 ? "s" : ""}!`);
      } else {
        toast.info("No SETs found in this image.");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      setError("We couldn't process your image. Please try again with a clearer photo.");
      toast.error("Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  const handleReset = () => {
    setResultImage(null);
    setDetectedSets([]);
    setActiveTab("upload");
  };
  return <Layout>
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="max-w-6xl mx-auto px-4 py-8">
        <motion.div className="text-center mb-8" initial={{
        y: -20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        duration: 0.5
      }}>
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-set-purple to-set-red bg-clip-text text-transparent sf-pro-display">
            SET Game Detector
          </h1>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto sf-pro-text">Upload a photo of your SET game layout</p>
        </motion.div>
        
        {error && <Alert variant="destructive" className="mb-6 max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>}
        
        <div className="max-w-5xl mx-auto">
          {activeTab === "upload" ? <div className="max-w-md mx-auto mb-12">
              <ImageUpload onImageSelected={handleImageSelected} isProcessing={isProcessing} />
            </div> : <ResultsDisplay resultImage={resultImage} sets={detectedSets} onReset={handleReset} />}
          
          {activeTab === "upload" && <HowItWorks />}
        </div>
      </motion.div>
    </Layout>;
};
export default Index;
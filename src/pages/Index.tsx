
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import ImageUpload from "@/components/upload/ImageUpload";
import ResultsDisplay from "@/components/results/ResultsDisplay";
import GameRules from "@/components/info/GameRules";
import { detectSets } from "@/services/api";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

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

  const handleImageSelected = async (file: File) => {
    try {
      setIsProcessing(true);
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

  return (
    <Layout>
      <div className="flex flex-col items-center max-w-6xl mx-auto">
        <div className="text-center mb-8 max-w-3xl animate-slide-in-down">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-set-purple to-set-red bg-clip-text text-transparent">
            SET Game Detector
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Upload a photo of your SET game layout and automatically find all valid SETs
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-6 mx-auto max-w-xs">
            <div className="aspect-square set-card-diamond bg-set-purple"></div>
            <div className="aspect-square set-card-oval bg-set-green"></div>
            <div className="aspect-square set-card-squiggle bg-set-red"></div>
          </div>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full max-w-5xl"
        >
          <TabsList className="grid w-full max-w-md mx-auto mb-6 grid-cols-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="results" disabled={!resultImage}>
              Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="animate-fade-in">
            <div className="space-y-8">
              <ImageUpload 
                onImageSelected={handleImageSelected} 
                isProcessing={isProcessing} 
              />
              
              {isProcessing && (
                <Card className="mx-auto max-w-md mt-6">
                  <CardContent className="flex items-center justify-center p-6">
                    <Loader2 className="h-6 w-6 text-primary animate-spin mr-2" />
                    <p>Processing image...</p>
                  </CardContent>
                </Card>
              )}
              
              <GameRules />
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            {resultImage && (
              <ResultsDisplay
                resultImage={resultImage}
                sets={detectedSets}
                onReset={handleReset}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;

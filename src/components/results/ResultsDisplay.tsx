
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import SetCard from "./SetCard";

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
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-7/12">
          <Card className="ios-card overflow-hidden">
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-lg flex justify-between items-center sf-pro-display">
                <span className="flex items-center">
                  <Eye className="h-4 w-4 text-primary mr-2" />
                  Results
                </span>
                <Badge className="bg-[#F8F2FF] text-set-purple dark:bg-[#2A1E38] border-0 rounded-full px-3 py-1 shadow-sm text-xs">
                  {sets.length} {sets.length === 1 ? "set" : "sets"} found
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {resultImage && (
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={resultImage}
                    alt="Detected sets"
                    className="w-full h-auto object-contain"
                  />
                  
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={onReset}
                      className="gap-1 rounded-full bg-background/70 backdrop-blur-sm"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span className="sf-pro-text text-xs">New</span>
                    </Button>
                    
                    <Button
                      variant="default"
                      size="sm"
                      onClick={downloadImage}
                      className="gap-1 rounded-full bg-primary/90 backdrop-blur-sm"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span className="sf-pro-text text-xs">Save</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:w-5/12">
          <Card className="ios-card h-full">
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-lg sf-pro-display flex items-center">
                <Eye className="h-4 w-4 text-primary mr-2" />
                SET Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {sets.length > 0 ? (
                <ScrollArea className="h-[400px] pr-2">
                  <div className="space-y-4">
                    {sets.map((set, index) => (
                      <SetCard key={index} set={set} index={index} />
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-center">
                  <div className="text-muted-foreground mb-2">
                    <svg className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none">
                      <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15.5C14.2091 15.5 16 13.7091 16 11.5C16 9.29086 14.2091 7.5 12 7.5C9.79086 7.5 8 9.29086 8 11.5C8 13.7091 9.79086 15.5 12 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-muted-foreground sf-pro-text">
                    No valid SETs found in this image
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Mobile action button */}
      <div className="md:hidden fixed-bottom-button">
        <Button 
          onClick={onReset}
          className="purple-button w-full flex items-center justify-center gap-2 py-4 shadow-xl"
        >
          <RefreshCw className="w-5 h-5" />
          <span className="sf-pro-display">Analyze Another Image</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;

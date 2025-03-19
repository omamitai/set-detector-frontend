
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, RefreshCw, Eye, Sparkles, 
  ChevronDown, ChevronRight, ListFilter, X 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import SetCard from "./SetCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
  const isMobile = useIsMobile();
  const [isSetDetailsOpen, setIsSetDetailsOpen] = useState(false);

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
      className="space-y-4 md:space-y-6"
    >
      {sets.length > 0 && (
        <div className="text-center mb-4">
          <Badge className="bg-gradient-to-r from-set-purple to-set-purple/80 text-white border-0 rounded-full px-5 py-1.5 shadow-md text-sm inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="sf-pro-display font-medium">{sets.length} {sets.length === 1 ? "SET" : "SETs"} found!</span>
          </Badge>
        </div>
      )}
      
      <div className="relative">
        <Card className="ios-card overflow-hidden">
          <CardHeader className="p-3 md:p-4 pb-0">
            <CardTitle className="text-base md:text-lg flex justify-between items-center sf-pro-display">
              <span className="flex items-center">
                <Eye className="h-4 w-4 text-primary mr-2" />
                Results
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4 relative">
            {resultImage && (
              <div className="relative overflow-hidden rounded-md shadow-md">
                <img
                  src={resultImage}
                  alt="Detected sets"
                  className="w-full h-auto object-contain border border-gray-100 rounded-md max-h-[calc(100vh-350px)]"
                />
                
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <Button
                    variant="secondary"
                    size={isMobile ? "sm" : "default"}
                    onClick={onReset}
                    className="gap-1 rounded-full bg-background/90 backdrop-blur-sm text-xs md:text-sm shadow-md"
                  >
                    <RefreshCw className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    <span className="sf-pro-text">New</span>
                  </Button>
                  
                  <Button
                    variant="default"
                    size={isMobile ? "sm" : "default"}
                    onClick={downloadImage}
                    className="gap-1 rounded-full bg-primary/90 backdrop-blur-sm text-xs md:text-sm shadow-md"
                  >
                    <Download className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    <span className="sf-pro-text">Save</span>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {sets.length > 0 && (
          <>
            {isMobile ? (
              // Mobile: Use Sheet from the bottom
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 gap-1.5 rounded-full text-sm py-2 px-5 shadow-lg bg-gradient-to-r from-set-purple to-set-purple/90 border-0 hover:shadow-xl hover:-translate-y-1"
                    size="sm"
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="font-medium">View {sets.length} SET Details</span>
                    <ChevronUp className="h-3.5 w-3.5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-xl h-[70vh] pt-6 px-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold sf-pro-display flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      SET Details
                    </h3>
                    <Badge className="bg-primary/10 text-primary">
                      {sets.length} Set{sets.length > 1 ? "s" : ""}
                    </Badge>
                  </div>
                  
                  <ScrollArea className="h-[calc(70vh-100px)]">
                    <div className="space-y-3 pr-2">
                      {sets.map((set, index) => (
                        <SetCard key={index} set={set} index={index} />
                      ))}
                    </div>
                    <ScrollBar />
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            ) : (
              // Desktop: Use expandable panel
              <div className="mt-4">
                <motion.div 
                  initial={false}
                  animate={isSetDetailsOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <Card className="ios-card mt-4 mb-2">
                    <CardHeader className="p-3 md:p-4 pb-0">
                      <CardTitle className="text-base md:text-lg sf-pro-display flex items-center justify-between">
                        <span className="flex items-center">
                          <Sparkles className="h-4 w-4 text-primary mr-2" />
                          SET Details
                        </span>
                        
                        {sets.length > 2 && (
                          <Badge variant="outline" className="text-xs flex items-center gap-1 bg-gray-50 border-gray-100">
                            <ChevronDown className="h-3 w-3" />
                            <span>Scroll for more</span>
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 md:p-4 pt-3 relative">
                      <ScrollArea className="h-[340px]">
                        <div className="space-y-3 pr-2">
                          {sets.map((set, index) => (
                            <SetCard key={index} set={set} index={index} />
                          ))}
                        </div>
                        <ScrollBar />
                      </ScrollArea>
                      
                      {sets.length > 2 && (
                        <motion.div 
                          className="absolute bottom-1 left-0 right-0 flex justify-center pointer-events-none"
                          animate={{ opacity: [0.5, 1, 0.5], y: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
                
                <Button 
                  onClick={() => setIsSetDetailsOpen(!isSetDetailsOpen)} 
                  className={`flex items-center gap-1.5 mx-auto mt-2 text-sm rounded-full py-2 px-5 
                  ${isSetDetailsOpen ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-gradient-to-r from-set-purple to-set-purple/90 text-white'}
                  transition-all shadow-md hover:shadow-lg`}
                  size="sm"
                >
                  {isSetDetailsOpen ? (
                    <>
                      <X className="h-3.5 w-3.5" />
                      <span>Hide SET Details</span>
                    </>
                  ) : (
                    <>
                      <ListFilter className="h-3.5 w-3.5" />
                      <span>View {sets.length} SET Details</span>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* If no sets are found, show message */}
      {sets.length === 0 && resultImage && (
        <div className="flex flex-col items-center justify-center p-4">
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 shadow-sm w-full max-w-sm">
            <div className="text-orange-500 mb-2">
              <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.995 16H12.004" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-gray-700 sf-pro-text text-sm font-medium text-center">
              No SET cards detected
            </p>
            <p className="text-gray-500 sf-pro-text text-xs mt-1 text-center">
              Please try taking a clearer picture of your SET game board
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Missing ChevronUp component
const ChevronUp = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);

export default ResultsDisplay;

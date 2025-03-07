
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

  // Colors for visualizing different sets
  const setColors = [
    "bg-set-purple text-white",
    "bg-set-green text-black",
    "bg-set-red text-white",
    "bg-blue-500 text-white",
    "bg-yellow-500 text-black",
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-7/12">
          <Card className="overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>
                  Results: {sets.length > 0 ? `${sets.length} sets found` : "No sets found"}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onReset}
                    className="gap-1"
                  >
                    <RefreshCw className="h-4 w-4" />
                    New
                  </Button>
                  {resultImage && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={downloadImage}
                      className="gap-1"
                    >
                      <Download className="h-4 w-4" />
                      Save
                    </Button>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {resultImage && (
                <img
                  src={resultImage}
                  alt="Detected sets"
                  className="w-full h-auto object-contain max-h-[60vh]"
                />
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:w-5/12">
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-lg">SET Details</CardTitle>
            </CardHeader>
            <CardContent>
              {sets.length > 0 ? (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {sets.map((set, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${setColors[index % setColors.length]}`}
                        >
                          Set {index + 1}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {set.cards.map((card, cardIndex) => (
                          <div
                            key={cardIndex}
                            className="border rounded-md p-2 text-xs"
                          >
                            <div className="font-semibold">{card.Count}x {card.Shape}</div>
                            <div className="text-muted-foreground">
                              {card.Color}, {card.Fill}
                            </div>
                          </div>
                        ))}
                      </div>
                      {index < sets.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No valid SETs found in this image
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;


import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CardFeature {
  Count: number;
  Color: string;
  Fill: string;
  Shape: string;
  Coordinates: number[];
}

interface SetCardProps {
  set: {
    cards: CardFeature[];
    set_indices: number[];
  };
  index: number;
}

const SetCard: React.FC<SetCardProps> = ({ set, index }) => {
  // Colors for badges and card borders
  const setColors = [
    { badge: "bg-[#F8F2FF] text-set-purple border-0", border: "border-set-purple/20" },
    { badge: "bg-[#F0FCFA] text-set-green border-0", border: "border-set-green/20" },
    { badge: "bg-[#FFF2F5] text-set-red border-0", border: "border-set-red/20" },
    { badge: "bg-[#EFF8FF] text-blue-500 border-0", border: "border-blue-500/20" },
    { badge: "bg-[#FFFBEB] text-yellow-500 border-0", border: "border-yellow-500/20" },
  ];
  
  // Get badge color based on set index
  const colorSet = setColors[index % setColors.length];

  return (
    <Card className={`ios-card overflow-hidden group transition-all hover:shadow-md hover:-translate-y-1 border ${colorSet.border}`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <Badge className={`${colorSet.badge} rounded-full px-3 py-0.5 shadow-sm group-hover:shadow`}>
            Set {index + 1}
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-2">
          {set.cards.map((card, cardIndex) => (
            <div
              key={cardIndex}
              className="border rounded-lg p-1.5 bg-background/50 backdrop-blur-sm hover:bg-white transition-all"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1 mb-1">
                  <Badge variant="outline" className="text-xs h-5 flex items-center justify-center bg-gray-50/80 whitespace-nowrap">
                    {card.Count}
                  </Badge>
                  <Badge variant="outline" className="text-xs h-5 flex items-center justify-center bg-gray-50/80 whitespace-nowrap capitalize">
                    {card.Shape}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-xs h-5 flex items-center justify-center bg-gray-50/80 whitespace-nowrap capitalize">
                    {card.Color}
                  </Badge>
                  <Badge variant="outline" className="text-xs h-5 flex items-center justify-center bg-gray-50/80 whitespace-nowrap capitalize">
                    {card.Fill}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SetCard;

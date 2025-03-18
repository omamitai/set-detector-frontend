
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
  // Colors for badges
  const setColors = [
    "bg-[#F8F2FF] text-set-purple border-0",
    "bg-[#F0FCFA] text-set-green border-0",
    "bg-[#FFF2F5] text-set-red border-0",
    "bg-[#EFF8FF] text-blue-500 border-0",
    "bg-[#FFFBEB] text-yellow-500 border-0",
  ];
  
  // Get badge color based on set index
  const badgeColor = setColors[index % setColors.length];

  return (
    <Card className="ios-card overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge className={`${badgeColor} rounded-full px-3 shadow-sm`}>
            Set {index + 1}
          </Badge>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-3">
          {set.cards.map((card, cardIndex) => (
            <div
              key={cardIndex}
              className="border rounded-md p-2 bg-background/50 backdrop-blur-sm"
            >
              <div className="sf-pro-display text-xs font-medium">
                {card.Count}× {card.Shape}
              </div>
              <div className="sf-pro-text text-xs text-muted-foreground">
                {card.Color}, {card.Fill}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SetCard;

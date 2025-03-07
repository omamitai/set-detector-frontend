
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GameRules: React.FC = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>About the SET Game</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="rules">
            <AccordionTrigger>How to play SET</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                SET is a card game where the goal is to find SETs of three cards. 
                A SET consists of three cards where each feature is either all the same or 
                all different across all three cards.
              </p>
              <p className="mb-2">
                Each card has four features:
              </p>
              <ul className="list-disc list-inside mb-2 space-y-1">
                <li><span className="font-medium">Count:</span> 1, 2, or 3 shapes</li>
                <li><span className="font-medium">Color:</span> red, green, or purple</li>
                <li><span className="font-medium">Fill:</span> empty, striped, or solid</li>
                <li><span className="font-medium">Shape:</span> diamond, oval, or squiggle</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="examples">
            <AccordionTrigger>Examples of valid SETs</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <p className="mb-2">
                  <span className="font-medium">Example 1:</span> Three cards with:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>All different counts (1, 2, 3)</li>
                  <li>All the same color (all purple)</li>
                  <li>All different fills (empty, striped, solid)</li>
                  <li>All the same shape (all diamonds)</li>
                </ul>
                
                <p className="mb-2">
                  <span className="font-medium">Example 2:</span> Three cards with:
                </p>
                <ul className="list-disc list-inside mb-2 space-y-1">
                  <li>All the same count (all 2)</li>
                  <li>All different colors (red, green, purple)</li>
                  <li>All the same fill (all solid)</li>
                  <li>All different shapes (diamond, oval, squiggle)</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="app">
            <AccordionTrigger>About this app</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">
                SET Sleuth is a personal project created for learning purposes and to help SET game enthusiasts. 
                It uses computer vision technology to automatically detect valid SETs from uploaded photos of 
                the game layout.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                This app is not affiliated with SET Enterprises Inc., the publisher of the official SET card game.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default GameRules;


import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Cpu, Eye } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Camera,
      title: "Capture",
      description: "Take a clear photo with good lighting from directly above the cards",
      details: "Position your camera parallel to the table for optimal card recognition",
      color: "text-set-purple bg-[#F8F2FF] dark:bg-[#2A1E38]"
    },
    {
      icon: Cpu,
      title: "Process",
      description: "Our AI identifies all cards' attributes: color, shape, fill, and count",
      details: "Machine learning models analyze each card to extract its unique characteristics",
      color: "text-set-green bg-[#F0FCFA] dark:bg-[#1E3330]"
    },
    {
      icon: Eye,
      title: "Discover",
      description: "See all valid SETs highlighted and learn the patterns",
      details: "A valid SET has three cards where each attribute is either all the same or all different",
      color: "text-set-red bg-[#FFF2F5] dark:bg-[#3A2328]"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="sf-pro-display text-xl font-medium mb-2">How It Works</h2>
          <p className="sf-pro-text text-sm text-muted-foreground max-w-sm mx-auto">
            Detect all SET combinations in three simple steps
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={item}>
              <Card className="ios-card h-full">
                <CardContent className="p-6 text-center flex flex-col h-full">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full shadow-inner flex items-center justify-center ${step.color}`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <h3 className="sf-pro-display font-medium mb-2 text-base">{step.title}</h3>
                  <p className="sf-pro-text text-muted-foreground text-sm mb-2">{step.description}</p>
                  <p className="sf-pro-text text-muted-foreground text-xs mt-auto">{step.details}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-8">
          <p className="sf-pro-text text-sm text-muted-foreground max-w-lg mx-auto">
            <strong>What makes a valid SET?</strong> Three cards where each feature (color, shape, fill, count) is either 
            all the same or all different across all three cards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

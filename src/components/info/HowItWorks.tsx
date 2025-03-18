
import React from "react";
import { Camera, Cpu, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <div className="w-full">
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-2 sf-pro-display text-gray-900">How It Works</h2>
        <p className="text-muted-foreground text-sm md:text-base sf-pro-text max-w-xl mx-auto">
          Instantly detect all valid SET combinations in three simple steps
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="border-0 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-8 h-full bg-white/75 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center">
              <div className="bg-set-purple/15 rounded-full p-4 mb-5">
                <Camera className="h-6 w-6 text-set-purple" />
              </div>
              <h3 className="text-lg font-medium mb-3 sf-pro-display text-gray-900">Capture</h3>
              <p className="text-muted-foreground sf-pro-text">
                Take a clear, overhead photo with good lighting and all cards visible
              </p>
            </div>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="border-0 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-8 h-full bg-white/75 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center">
              <div className="bg-set-green/15 rounded-full p-4 mb-5">
                <Cpu className="h-6 w-6 text-set-green" />
              </div>
              <h3 className="text-lg font-medium mb-3 sf-pro-display text-gray-900">Process</h3>
              <p className="text-muted-foreground sf-pro-text">
                Our AI algorithms identify each card's color, shape, number, and pattern
              </p>
            </div>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="border-0 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-8 h-full bg-white/75 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center">
              <div className="bg-set-red/15 rounded-full p-4 mb-5">
                <Eye className="h-6 w-6 text-set-red" />
              </div>
              <h3 className="text-lg font-medium mb-3 sf-pro-display text-gray-900">Discover</h3>
              <p className="text-muted-foreground sf-pro-text">
                View all valid SETs where features are either all same or all different
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;

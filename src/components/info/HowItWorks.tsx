
import React from "react";
import { Camera, Cpu, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div 
        className="text-center mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h2 className="text-lg md:text-xl font-semibold mb-1 sf-pro-display text-gray-900">How It Works</h2>
        <p className="text-muted-foreground text-xs md:text-sm sf-pro-text max-w-md mx-auto">
          Instantly detect all valid SET combinations in three simple steps
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="group"
        >
          <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-5 h-full bg-white/90 backdrop-blur-sm group-hover:-translate-y-1 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-set-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="bg-set-purple/15 rounded-full p-3 mb-3 transform transition-transform group-hover:scale-110 duration-300">
                <Camera className="h-4 w-4 md:h-5 md:w-5 text-set-purple" />
              </div>
              <h3 className="text-sm md:text-base font-medium mb-2 sf-pro-display text-gray-900">Capture</h3>
              <p className="text-muted-foreground text-xs md:text-sm sf-pro-text">
                Take a clear photo with good lighting and all cards visible
              </p>
            </div>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="group"
        >
          <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-5 h-full bg-white/90 backdrop-blur-sm group-hover:-translate-y-1 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-set-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="bg-set-green/15 rounded-full p-3 mb-3 transform transition-transform group-hover:scale-110 duration-300">
                <Cpu className="h-4 w-4 md:h-5 md:w-5 text-set-green" />
              </div>
              <h3 className="text-sm md:text-base font-medium mb-2 sf-pro-display text-gray-900">Process</h3>
              <p className="text-muted-foreground text-xs md:text-sm sf-pro-text">
                Our AI identifies each card's color, shape, number, and pattern
              </p>
            </div>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="group"
        >
          <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-5 h-full bg-white/90 backdrop-blur-sm group-hover:-translate-y-1 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-set-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="bg-set-red/15 rounded-full p-3 mb-3 transform transition-transform group-hover:scale-110 duration-300">
                <Eye className="h-4 w-4 md:h-5 md:w-5 text-set-red" />
              </div>
              <h3 className="text-sm md:text-base font-medium mb-2 sf-pro-display text-gray-900">Discover</h3>
              <p className="text-muted-foreground text-xs md:text-sm sf-pro-text">
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

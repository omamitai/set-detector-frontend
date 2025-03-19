
import React from "react";
import { Camera, Cpu, Eye, SparkleIcon, Lightbulb, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const HowItWorks = () => {
  const isMobile = useIsMobile();
  
  // Define steps with more engaging content and vibrant colors
  const steps = [
    {
      icon: <Camera className="h-5 w-5" />,
      title: "Capture",
      description: "Take a clear, well-lit photo of your SET game cards laid out on a flat surface with good contrast",
      color: "set-purple",
      bgGradient: "from-[#F8F2FF] to-[#F0E6FF]",
      delay: 0.2,
      iconBg: "#EFE5FF"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Analyze",
      description: "Our AI instantly detects all cards on the board and identifies their unique attributes",
      color: "set-green",
      bgGradient: "from-[#F0FCFA] to-[#E0F5F2]",
      delay: 0.3,
      iconBg: "#E0F5F2"
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Discover",
      description: "See all valid SETs highlighted on your game board with detailed explanations",
      color: "set-red",
      bgGradient: "from-[#FFF2F5] to-[#FFE5EB]",
      delay: 0.4,
      iconBg: "#FFE5EB"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto backdrop-blur-sm rounded-xl p-4 md:p-5"
    >
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-base md:text-lg font-semibold mb-1 sf-pro-display text-gray-900 flex items-center justify-center">
          <SparkleIcon className="h-4 w-4 mr-1.5 text-primary" />
          How It Works
        </h2>
        <p className="text-muted-foreground text-xs md:text-sm sf-pro-text max-w-md mx-auto">
          Our AI-powered SET detector helps you find all valid SET combinations in seconds
        </p>
      </div>
      
      <div className={`${isMobile ? 'flex flex-col' : 'grid grid-cols-3'} gap-3 md:gap-4`}>
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: step.delay, duration: 0.5 }}
            className="group"
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            <div 
              className={cn(
                "rounded-xl border border-gray-100/80 shadow-md p-4 h-full",
                "bg-gradient-to-br backdrop-blur-sm group-hover:shadow-lg transition-all duration-300 overflow-hidden relative",
                `bg-gradient-to-br ${step.bgGradient}`
              )}
            >
              <div className="absolute inset-0 bg-white/50 group-hover:bg-white/20 transition-colors duration-300" />
              
              <div className={`flex ${isMobile ? 'items-center' : 'flex-col'} gap-3 relative z-10`}>
                <div 
                  className={`rounded-full p-3 ${isMobile ? 'mb-0' : 'mb-2'} transition-transform group-hover:scale-110 duration-300 w-fit 
                  ${isMobile ? 'flex-shrink-0' : ''}`}
                  style={{ backgroundColor: step.iconBg }}
                >
                  <div className={`text-${step.color}`}>
                    {step.icon}
                  </div>
                </div>
                
                <div className={isMobile ? 'flex-1' : ''}>
                  <h3 className="text-sm md:text-base font-medium mb-1 sf-pro-display text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sf-pro-text">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HowItWorks;

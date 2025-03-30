
import React from "react";
import { Camera, Cpu, Eye, SparkleIcon, Lightbulb, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const HowItWorks = () => {
  const isMobile = useIsMobile();
  
  // Define steps with more engaging content and iOS-style colors
  const steps = [
    {
      icon: <Camera className="h-5 w-5" />,
      title: "Capture",
      description: "Take a clear, well-lit photo of your SET game cards laid out on a flat surface",
      color: "set-purple",
      bgGradient: "from-[#EFEAFF] to-[#E5DFFF]",
      delay: 0.2,
      iconBg: "#D6D2FD"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Analyze",
      description: "Our AI instantly detects all cards on the board and identifies their unique attributes",
      color: "set-green",
      bgGradient: "from-[#E3FBE9] to-[#D4F8DE]",
      delay: 0.3,
      iconBg: "#C3F0CF"
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Discover",
      description: "See all valid SETs highlighted on your game board with detailed explanations",
      color: "set-coral",
      bgGradient: "from-[#FFE5E3] to-[#FFDDD9]",
      delay: 0.4,
      iconBg: "#FFCEC8"
    }
  ];

  // Container and item variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto backdrop-blur-sm rounded-xl p-4 md:p-5"
    >
      <motion.div 
        variants={itemVariants}
        className="text-center mb-4 md:mb-6"
      >
        <h2 className="text-base md:text-lg font-semibold mb-1 sf-pro-display text-set-dark flex items-center justify-center">
          <SparkleIcon className="h-4 w-4 mr-1.5 text-set-purple" />
          How It Works
        </h2>
        <p className="text-set-gray text-xs md:text-sm sf-pro-text max-w-md mx-auto">
          Our AI-powered SET detector helps you find all valid SET combinations instantly
        </p>
      </motion.div>
      
      <div className={`${isMobile ? 'flex flex-col' : 'grid grid-cols-3'} gap-3 md:gap-4`}>
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="group"
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            <div 
              className={cn(
                "rounded-xl border-0 shadow-sm p-4 h-full",
                "bg-gradient-to-br backdrop-blur-sm group-hover:shadow-md transition-all duration-300 overflow-hidden relative",
                `bg-gradient-to-br ${step.bgGradient}`
              )}
            >
              <div className="absolute inset-0 bg-white/20 group-hover:bg-white/10 transition-colors duration-300" />
              
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
                  <h3 className="text-sm md:text-base font-medium mb-1.5 sf-pro-display text-set-dark">
                    {step.title}
                  </h3>
                  <p className="text-set-gray text-xs sf-pro-text">
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

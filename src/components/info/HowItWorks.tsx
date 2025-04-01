
import React from "react";
import { Camera, Lightbulb, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const HowItWorks = () => {
  const isMobile = useIsMobile();
  
  // Define steps with enhanced styling and gradients
  const steps = [
    {
      icon: <Camera className="h-6 w-6 text-white" />,
      title: "Capture",
      description: "Take a clear photo of your SET game cards on a flat surface with good lighting",
      gradient: "from-red-400 via-red-500 to-red-600",
      delay: 0.2,
      iconAnimation: "animate-pulse",
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "Analyze",
      description: "Our AI instantly detects all cards and identifies their unique attributes",
      gradient: "from-amber-400 via-amber-500 to-amber-600",
      delay: 0.3,
      iconAnimation: "animate-bounce-subtle",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-white" />,
      title: "Discover",
      description: "See all valid SETs highlighted with detailed explanations in seconds",
      gradient: "from-red-400 via-red-500 to-red-600",
      delay: 0.4,
      iconAnimation: "animate-shimmer",
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
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 }}
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto px-4 md:px-6 rounded-2xl mt-12 mb-16"
    >
      <motion.div 
        variants={itemVariants}
        className="text-center mb-8 md:mb-10"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800 font-poppins tracking-tight">
          How It Works
        </h2>
        <p className="text-gray-500 text-sm md:text-base font-sans max-w-md mx-auto">
          Instantly spot every SET. Just snap, and play smarter.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="group"
          >
            <div 
              className={cn(
                "rounded-xl shadow-lg p-6 h-full border-0 overflow-hidden relative",
                "bg-gradient-to-br backdrop-blur-md transition-all duration-300",
                `bg-gradient-to-br ${step.gradient}`
              )}
            >
              {/* Enhanced glass overlay */}
              <div className="absolute inset-0 opacity-10 bg-white/30 backdrop-blur-sm group-hover:opacity-25 transition-opacity duration-300" />
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div 
                  className={`rounded-full p-3 mb-5 bg-white/25 backdrop-blur-xl
                   transition-transform duration-300 w-16 h-16 flex items-center justify-center
                   shadow-md group-hover:shadow-lg group-hover:scale-110 ${step.iconAnimation}`}
                >
                  {step.icon}
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold mb-3 font-poppins text-white">
                  {step.title}
                </h3>
                <p className="text-white/95 text-sm md:text-base font-sans">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HowItWorks;

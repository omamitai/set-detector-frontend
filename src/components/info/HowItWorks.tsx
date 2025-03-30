
import React from "react";
import { Camera, Lightbulb, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const HowItWorks = () => {
  const isMobile = useIsMobile();
  
  // Define steps with more sophisticated styling
  const steps = [
    {
      icon: <Camera className="h-6 w-6 text-white" />,
      title: "Capture",
      description: "Take a clear photo of your SET game cards on a flat surface with good lighting",
      gradient: "from-blue-400/80 via-blue-500/70 to-blue-600/60",
      delay: 0.2,
      iconAnimation: "animate-pulse",
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "Analyze",
      description: "Our AI instantly detects all cards and identifies their unique attributes",
      gradient: "from-teal-400/80 via-teal-500/70 to-teal-600/60",
      delay: 0.3,
      iconAnimation: "animate-bounce-subtle",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-white" />,
      title: "Discover",
      description: "See all valid SETs highlighted with detailed explanations in seconds",
      gradient: "from-purple-400/80 via-purple-500/70 to-purple-600/60",
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
      className="w-full max-w-4xl mx-auto px-4 md:px-6 rounded-2xl mt-8"
    >
      <motion.div 
        variants={itemVariants}
        className="text-center mb-6 md:mb-8"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800 font-poppins tracking-tight">
          How It Works
        </h2>
        <p className="text-gray-500 text-sm md:text-base font-sans max-w-md mx-auto">
          Instantly spot every SET. Just snap, and play smarter.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="group"
          >
            <div 
              className={cn(
                "rounded-xl shadow-sm p-6 h-full border-0 overflow-hidden relative",
                "bg-gradient-to-br backdrop-blur-md group-hover:shadow-md transition-all duration-300",
                `bg-gradient-to-br ${step.gradient}`
              )}
            >
              {/* Subtle glass overlay */}
              <div className="absolute inset-0 opacity-10 bg-white/20 backdrop-blur-sm group-hover:opacity-20 transition-opacity duration-300" />
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div 
                  className={`rounded-full p-3 mb-4 bg-white/20 backdrop-blur-xl
                   transition-transform duration-300 w-14 h-14 flex items-center justify-center
                   shadow-sm group-hover:shadow-md group-hover:scale-105 ${step.iconAnimation}`}
                >
                  {step.icon}
                </div>
                
                <h3 className="text-lg md:text-xl font-medium mb-2 font-poppins text-white">
                  {step.title}
                </h3>
                <p className="text-white/90 text-sm md:text-base font-sans">
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

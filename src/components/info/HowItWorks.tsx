
import React from "react";
import { Camera, Lightbulb, Zap, Share2, Info } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const HowItWorks = () => {
  const isMobile = useIsMobile();
  
  // Define steps with more sophisticated colors and content
  const steps = [
    {
      icon: <Camera className="h-6 w-6 text-white" />,
      title: "Capture",
      description: "Take a clear photo of your SET game cards on a flat surface with good lighting",
      color: "set-purple",
      gradient: "from-[#5856D6]/90 to-[#7A78E2]/80",
      delay: 0.2,
      iconAnimation: "animate-pulse",
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "Analyze",
      description: "Our AI instantly detects all cards and identifies their unique attributes",
      color: "set-green",
      gradient: "from-[#4A8072]/90 to-[#5A9889]/80",
      delay: 0.3,
      iconAnimation: "animate-bounce-subtle",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-white" />,
      title: "Discover",
      description: "See all valid SETs highlighted with detailed explanations in seconds",
      color: "set-red",
      gradient: "from-[#D06175]/90 to-[#E57185]/80",
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

  const interactiveSymbols = [
    { symbol: "◇", color: "text-[#5856D6]", animation: "animate-float", delay: 0 },
    { symbol: "○", color: "text-[#D06175]", animation: "animate-pulse", delay: 0.2 },
    { symbol: "△", color: "text-[#4A8072]", animation: "animate-bounce-subtle", delay: 0.4 }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto p-4 md:p-6 rounded-2xl"
    >
      <motion.div 
        variants={itemVariants}
        className="text-center mb-6 md:mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          {interactiveSymbols.map((item, idx) => (
            <motion.div
              key={idx}
              className={`${item.color} text-2xl md:text-3xl font-bold ${item.animation}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.delay, duration: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.symbol}
            </motion.div>
          ))}
        </div>
        
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
                "rounded-2xl shadow-md p-6 h-full border-0 overflow-hidden relative",
                "bg-gradient-to-br backdrop-blur-sm group-hover:shadow-lg transition-all duration-300",
                `bg-gradient-to-br ${step.gradient}`
              )}
            >
              <div className="absolute inset-0 opacity-5 bg-pattern-dots" />
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div 
                  className={`rounded-full p-3 mb-4 bg-white/20 backdrop-blur-md
                   transition-transform duration-300 w-16 h-16 flex items-center justify-center
                   shadow-md group-hover:shadow-lg group-hover:scale-110 ${step.iconAnimation}`}
                >
                  {step.icon}
                </div>
                
                <h3 className="text-lg md:text-xl font-bold mb-2 font-poppins text-white">
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
      
      <motion.div 
        variants={itemVariants}
        className="mt-8 text-center flex items-center justify-center gap-4 flex-wrap"
      >
        <a 
          href="https://www.setgame.com/sites/default/files/instructions/SET%20INSTRUCTIONS%20-%20ENGLISH.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-set-purple transition-colors text-sm"
        >
          <Info className="h-4 w-4" />
          <span>SET Game Rules</span>
        </a>
        
        <div className="h-5 border-l border-gray-300 hidden md:block"></div>
        
        <a 
          href="https://github.com/omamitai/set-detector"
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-set-purple transition-colors text-sm"
        >
          <Share2 className="h-4 w-4" />
          <span>Share this tool</span>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default HowItWorks;

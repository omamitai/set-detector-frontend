
import React from "react";
import { Camera, Zap, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const HowItWorks = () => {
  const isMobile = useIsMobile();

  // Define steps with enhanced styling and SET-themed gradients
  const steps = [{
    icon: <Camera className="h-6 w-6 text-white" />,
    title: "Capture",
    description: "Take a clear photo of your SET game cards on a flat surface with good lighting",
    gradient: "bg-gradient-to-br from-set-red via-set-red to-set-red-light",
    delay: 0.2,
    iconAnimation: "animate-pulse-slow"
  }, {
    icon: <Zap className="h-6 w-6 text-white" />,
    title: "Analyze",
    description: "A fine-tuned YOLO model locates all cards, then specialized models identify each card's attributes",
    gradient: "bg-gradient-to-br from-set-green via-set-green to-set-green-light",
    delay: 0.3,
    iconAnimation: "animate-bounce-subtle"
  }, {
    icon: <Lightbulb className="h-6 w-6 text-white" />,
    title: "Discover",
    description: "The algorithm identifies all valid SETs by evaluating every possible combination, highlighting them instantly",
    gradient: "bg-gradient-to-br from-set-purple via-set-purple to-set-purple-light",
    delay: 0.4,
    iconAnimation: "animate-shimmer"
  }];

  // Container and item variants for staggered animations
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 10,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };
  return <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-4xl mx-auto px-4 md:px-6 rounded-2xl mt-12 mb-16 relative">
      {/* Background decorative elements for How It Works section */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="set-shape-diamond set-color-red absolute w-32 h-32 -top-10 -right-8 rotate-12"></div>
        <div className="set-shape-oval set-color-purple absolute w-28 h-28 bottom-16 -left-10 rotate-45"></div>
        <div className="set-shape-triangle set-color-green absolute w-24 h-24 top-1/3 right-0 -rotate-12"></div>
      </div>
      
      <motion.div variants={itemVariants} className="text-center mb-8 md:mb-10">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800 font-poppins tracking-tight">
          How It Works
        </h2>
        <p className="text-gray-500 text-sm md:text-base font-sans max-w-md mx-auto">From photo to solution in seconds: A three-step process finds every valid SET combination</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
        {steps.map((step, index) => <motion.div key={index} variants={itemVariants} whileHover={{
        y: -2,
        transition: {
          duration: 1.5,
          ease: "easeInOut"
        }
      }} whileTap={{
        scale: 0.98
      }} className="group">
            <div className={cn("rounded-xl shadow-lg p-6 h-full border-0 overflow-hidden relative", "backdrop-blur-md transition-all duration-500", step.gradient)}>
              {/* Enhanced glass overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 opacity-30 backdrop-blur-sm group-hover:opacity-40 transition-opacity duration-500" />
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div className={`rounded-full p-3 mb-5 bg-white/25 backdrop-blur-xl
                   transition-transform duration-1200 w-16 h-16 flex items-center justify-center
                   shadow-md group-hover:shadow-lg group-hover:scale-105 ${step.iconAnimation}`}>
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
          </motion.div>)}
      </div>
    </motion.div>;
};

export default HowItWorks;


import React from "react";
import { Camera, Lightbulb, Zap, Share2, Info } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const isMobile = useIsMobile();
  
  // Define steps with more sophisticated styling
  const steps = [
    {
      icon: <Camera className="h-6 w-6 text-white" />,
      title: "Capture",
      description: "Take a clear photo of your SET game cards on a flat surface with good lighting",
      gradient: "from-primary-purple/90 via-primary-violet/80 to-primary-indigo/70",
      delay: 0.2,
      iconAnimation: "animate-pulse",
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "Analyze",
      description: "Our AI instantly detects all cards and identifies their unique attributes",
      gradient: "from-accent-teal/90 via-teal-400/80 to-emerald-500/70",
      delay: 0.3,
      iconAnimation: "animate-bounce-subtle",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-white" />,
      title: "Discover",
      description: "See all valid SETs highlighted with detailed explanations in seconds",
      gradient: "from-accent-pink/90 via-rose-400/80 to-accent-amber/70",
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

  // Function to share the tool
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'SET Game Detector',
          text: 'Check out this tool that helps you find SETs in the SET card game!',
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

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
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary-purple via-primary-violet to-primary-indigo font-poppins tracking-tight">
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
                "rounded-2xl shadow-lg p-6 h-full border-0 overflow-hidden relative",
                "bg-gradient-to-br backdrop-blur-md group-hover:shadow-xl transition-all duration-300",
                `bg-gradient-to-br ${step.gradient}`
              )}
            >
              {/* Animated glass overlay */}
              <div className="absolute inset-0 opacity-10 bg-white/20 backdrop-blur-sm group-hover:opacity-20 transition-opacity duration-300" />
              
              {/* Animated glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-white/20 rounded-full blur-2xl transform scale-75 group-hover:scale-100" />
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div 
                  className={`rounded-full p-3 mb-4 bg-white/20 backdrop-blur-xl
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
    </motion.div>
  );
};

export default HowItWorks;

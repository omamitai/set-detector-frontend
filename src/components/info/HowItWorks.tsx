
import React from "react";
import { Camera, Cpu, Eye, SparkleIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const HowItWorks = () => {
  const isMobile = useIsMobile();
  
  // Define steps with more engaging content and vibrant colors
  const steps = [
    {
      icon: <Camera className="h-4 w-4" />,
      title: "Capture",
      description: "Take a clear photo of your SET game",
      color: "set-purple",
      bgGradient: "from-[#F8F2FF] to-[#F0E6FF]",
      delay: 0.2,
      iconBg: "#EFE5FF"
    },
    {
      icon: <Cpu className="h-4 w-4" />,
      title: "Process",
      description: "AI identifies all card attributes",
      color: "set-green",
      bgGradient: "from-[#F0FCFA] to-[#E0F5F2]",
      delay: 0.3,
      iconBg: "#E0F5F2"
    },
    {
      icon: <Eye className="h-4 w-4" />,
      title: "Discover",
      description: "See all valid SETs highlighted instantly",
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
      className="w-full max-w-4xl mx-auto backdrop-blur-sm rounded-xl p-3 md:p-4"
    >
      <div className="text-center mb-2">
        <h2 className="text-base font-semibold mb-0 sf-pro-display text-gray-900 flex items-center justify-center">
          <SparkleIcon className="h-3.5 w-3.5 mr-1.5 text-primary" />
          How It Works
        </h2>
      </div>
      
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: step.delay, duration: 0.5 }}
            className="group"
            whileHover={{ y: -2 }}
          >
            <div 
              className={cn(
                "rounded-xl border border-gray-100/80 shadow-sm p-2 md:p-3 h-full",
                "bg-gradient-to-br backdrop-blur-sm group-hover:shadow-md overflow-hidden relative",
                `bg-gradient-to-br ${step.bgGradient}`
              )}
            >
              <div className="absolute inset-0 bg-white/50 group-hover:bg-white/20 transition-colors duration-300" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div 
                  className={`flex-shrink-0 rounded-full p-2 transition-transform group-hover:scale-110 duration-300 ${isMobile ? "hidden" : "block"}`}
                  style={{ backgroundColor: step.iconBg }}
                >
                  <div className={`text-${step.color}`}>
                    {step.icon}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-0.5 sf-pro-display text-gray-900">
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

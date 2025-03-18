
import React from "react";
import { Camera, Cpu, Eye } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div 
        className="text-center mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h2 className="text-lg md:text-xl font-semibold mb-1 sf-pro-display text-gray-900">How It Works</h2>
        <p className="text-muted-foreground text-xs md:text-sm sf-pro-text max-w-md mx-auto">
          Instantly detect all valid SET combinations in three simple steps
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {[
          {
            icon: <Camera className="h-3.5 w-3.5 md:h-4 md:w-4" />,
            title: "Capture",
            description: "Take a clear photo with good lighting",
            color: "set-purple",
            delay: 0.2
          },
          {
            icon: <Cpu className="h-3.5 w-3.5 md:h-4 md:w-4" />,
            title: "Process",
            description: "AI identifies all card attributes",
            color: "set-green",
            delay: 0.3
          },
          {
            icon: <Eye className="h-3.5 w-3.5 md:h-4 md:w-4" />,
            title: "Discover",
            description: "View all valid SETs in your layout",
            color: "set-red",
            delay: 0.4
          }
        ].map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: step.delay, duration: 0.5 }}
            className="group relative"
            whileHover={{ y: -3 }}
          >
            <div className="rounded-xl border border-gray-100 shadow-sm transition-all duration-300 p-3 md:p-4 h-full bg-white/90 backdrop-blur-sm group-hover:shadow-md overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                style={{ "--color": `var(--${step.color})` } as React.CSSProperties} 
              />
              
              <div className="flex items-start gap-3 relative z-10">
                <div className={`flex-shrink-0 rounded-full p-2 transition-transform group-hover:scale-110 duration-300 bg-[var(--light-bg)]`}
                  style={{ 
                    "--light-bg": `var(--${step.color}-light)`,
                    "--text-color": `var(--${step.color})`
                  } as React.CSSProperties}
                >
                  <div className="text-[var(--text-color)]">
                    {step.icon}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm font-medium mb-1 sf-pro-display text-gray-900">
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
    </div>
  );
};

export default HowItWorks;

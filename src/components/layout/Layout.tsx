
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Github } from "lucide-react";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 relative overflow-hidden">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        
        body {
          -webkit-tap-highlight-color: transparent;
          height: 100%;
          overscroll-behavior-y: none;
        }
        
        /* Enhanced mobile optimizations */
        @media (max-width: 640px) {
          html, body {
            overflow-x: hidden;
          }
          
          body {
            padding-bottom: env(safe-area-inset-bottom, 20px);
          }
          
          /* Better tap targets */
          button, a, .clickable {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* Much more subtle gradient that starts from the very top-left corner */
        .bg-gradient-full {
          background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.99) 0%, rgba(248, 245, 255, 0.85) 35%, rgba(242, 235, 255, 0.7) 100%);
          background-attachment: fixed;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -10;
          margin: 0;
          padding: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh; /* dynamic viewport height - handles mobile browsers better */
          margin-top: env(safe-area-inset-top, 0);
          margin-left: env(safe-area-inset-left, 0);
          margin-right: env(safe-area-inset-right, 0);
        }
      `}
      </style>

      {/* Improved Background Gradient - positioned to cover notch area */}
      <div className="bg-gradient-full"></div>

      {/* Enhanced Background SET Icons with better positioning and subtle animations */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none opacity-[0.025]">
        {/* Row 1 */}
        <motion.div 
          className="set-shape-diamond set-color-red absolute w-36 h-36 -top-8 -left-4 rotate-12"
          initial={{ opacity: 0.7 }}
          animate={{ 
            opacity: [0.7, 0.9, 0.7],
            rotate: [12, 15, 12],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="set-shape-oval set-color-purple absolute w-24 h-24 top-32 left-1/5 rotate-45"
          initial={{ opacity: 0.7 }}
          animate={{ 
            opacity: [0.7, 0.9, 0.7],
            rotate: [45, 40, 45],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="set-shape-triangle set-color-green absolute w-32 h-32 top-16 right-16 -rotate-12"
          initial={{ opacity: 0.7 }}
          animate={{ 
            opacity: [0.7, 0.9, 0.7],
            rotate: [-12, -15, -12],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Rows 2 and 3 */}
        <motion.div 
          className="set-shape-diamond set-color-blue absolute w-28 h-28 top-1/3 left-1/4 -rotate-12"
          initial={{ opacity: 0.7 }}
          animate={{ 
            opacity: [0.7, 0.9, 0.7],
            rotate: [-12, -8, -12],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="set-shape-oval set-color-red absolute w-40 h-40 top-1/3 -right-10 rotate-12"
          initial={{ opacity: 0.7 }}
          animate={{ 
            opacity: [0.7, 0.9, 0.7],
            rotate: [12, 15, 12],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />

        <motion.div 
          className="set-shape-triangle set-color-purple absolute w-36 h-36 bottom-32 left-10 rotate-75"
          initial={{ opacity: 0.7 }}
          animate={{ 
            opacity: [0.7, 0.9, 0.7],
            rotate: [75, 80, 75],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        />
        <motion.div 
          className="set-shape-diamond set-color-green absolute w-48 h-48 bottom-16 right-0 -rotate-6"
          initial={{ opacity: 0.7 }}
          animate={{ 
            opacity: [0.7, 0.9, 0.7],
            rotate: [-6, -10, -6],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <main className="flex-grow relative z-10 pt-safe">
        {children}
      </main>

      <footer className="border-t border-gray-100 py-3 bg-white/80 backdrop-blur-xl sticky bottom-0 mt-auto z-20 w-full shadow-[0_-1px_3px_rgba(0,0,0,0.05)] px-safe">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4">
            <p className="text-xs text-gray-500 font-sans">
              SET® is a registered trademark of Cannei, LLC.
            </p>
            <p className="text-xs text-gray-500 font-sans">
              Detector by <a 
                href="https://github.com/omamitai" 
                className="underline hover:text-gray-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                @omamitai
              </a>
            </p>
          </div>
          
          <a 
            href="https://github.com/omamitai" 
            className="flex items-center justify-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-sm text-gray-600 hidden sm:inline">GitHub</span>
            <Github className="h-4 w-4 text-gray-600" />
          </a>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;

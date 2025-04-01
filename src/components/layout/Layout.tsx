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
        
        /* Fixed gradient background that properly covers the notch area */
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
        }

        /* Fix for iPhone notch area */
        @supports (padding-top: env(safe-area-inset-top)) {
          .bg-gradient-full {
            padding-top: env(safe-area-inset-top);
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
            /* These negative margins offset the padding, maintaining full coverage */
            margin-top: calc(env(safe-area-inset-top) * -1);
            margin-left: calc(env(safe-area-inset-left) * -1);
            margin-right: calc(env(safe-area-inset-right) * -1);
          }
        }
      `}
      </style>

      {/* Improved Background Gradient - positioned to cover notch area */}
      <div className="bg-gradient-full"></div>

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

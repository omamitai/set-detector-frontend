import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Github } from "lucide-react";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  // Add effect to ensure the background gets applied immediately
  useEffect(() => {
    // Force the document body to take on specific styles
    document.documentElement.classList.add('gradient-ready');
    document.body.classList.add('gradient-body');
    
    // Ensure proper viewport height
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    
    return () => {
      window.removeEventListener('resize', setViewportHeight);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 relative overflow-hidden">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        
        /* Reset styles to ensure full control */
        html, body, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow-x: hidden;
          position: relative;
        }
        
        /* Global gradient setup */
        html.gradient-ready {
          background: transparent;
        }
        
        body.gradient-body {
          background: transparent !important;
          -webkit-tap-highlight-color: transparent;
          overscroll-behavior-y: none;
        }
        
        /* Fixed full-page gradient that properly covers the entire screen including notch area */
        .bg-gradient-full {
          background: linear-gradient(135deg, #9C6AFF 0%, #8A4FD3 50%, #7A45BE 100%);
          background-attachment: fixed;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 0;
          padding: 0;
          width: 100vw;
          height: 100vh;
          height: calc(var(--vh, 1vh) * 100);
          z-index: -10;
        }
        
        /* Enhanced mobile optimizations */
        @media (max-width: 640px) {
          /* Better tap targets */
          button, a, .clickable {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* iOS safe area handling */
        @supports (padding-top: env(safe-area-inset-top)) {
          .bg-gradient-full {
            padding-top: env(safe-area-inset-top, 0);
            padding-right: env(safe-area-inset-right, 0);
            padding-bottom: env(safe-area-inset-bottom, 0);
            padding-left: env(safe-area-inset-left, 0);
            margin: 0;
          }
          
          .content-safe-area {
            padding-top: env(safe-area-inset-top, 20px);
          }
          
          .footer-safe-area {
            padding-bottom: env(safe-area-inset-bottom, 20px);
          }
        }
      `}
      </style>

      {/* Improved Background Gradient - explicitly positioned to cover entire viewport */}
      <div className="bg-gradient-full"></div>

      <main className="flex-grow relative z-10 content-safe-area">
        {children}
      </main>

      <footer className="border-t border-gray-100/30 py-3 bg-white/80 backdrop-blur-xl sticky bottom-0 mt-auto z-20 w-full shadow-[0_-1px_3px_rgba(0,0,0,0.05)] footer-safe-area">
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

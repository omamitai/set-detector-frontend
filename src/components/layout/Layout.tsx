
import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Info, SparkleIcon } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-set-gradient">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        
        :root {
          --set-primary: #5856D6;
          --set-secondary: #C7C2F9;
          --set-accent: #FF453A;
          font-family: 'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
        }
        
        body {
          -webkit-tap-highlight-color: transparent;
          height: 100%;
          overscroll-behavior-y: none;
        }
        
        .bg-set-gradient {
          background-attachment: fixed;
          background-image: 
            radial-gradient(at 20% 30%, rgba(88, 86, 214, 0.15) 0px, transparent 50%), 
            radial-gradient(at 80% 20%, rgba(48, 209, 88, 0.15) 0px, transparent 50%),
            radial-gradient(at 50% 70%, rgba(255, 69, 58, 0.1) 0px, transparent 50%);
        }
        
        .bg-pattern-dots {
          background-image: radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px);
          background-size: 12px 12px;
        }
        
        /* SET icons styling */
        .set-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          font-size: 1.2rem;
          line-height: 1;
          transition: transform 0.3s ease;
        }
        
        .set-icon:hover {
          transform: rotate(10deg) scale(1.1);
        }
        
        /* Add height for bottom safe area on mobile */
        .h-safe-bottom {
          height: env(safe-area-inset-bottom, 20px);
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .mobile-safe-area {
            padding-bottom: env(safe-area-inset-bottom, 16px);
            padding-top: env(safe-area-inset-top, 0);
            padding-left: env(safe-area-inset-left, 16px);
            padding-right: env(safe-area-inset-right, 16px);
          }
        }
      `}
      </style>

      <header className="border-b border-gray-200/30 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto py-3 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="flex space-x-1 mr-2">
                <div className="set-icon text-set-purple">◇</div>
                <div className="set-icon text-set-red">○</div>
                <div className="set-icon text-set-green">△</div>
              </div>
              <h1 className="font-bold text-lg text-gray-900 font-poppins">SET Detector</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <a 
              href="https://www.setgame.com/set/puzzle_rules"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" className="rounded-full text-set-gray hover:text-set-purple">
                <Info className="h-5 w-5" />
              </Button>
            </a>
            
            <a 
              href="https://github.com/omamitai/set-detector"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" className="rounded-full text-set-gray hover:text-set-purple">
                <Github className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow mobile-safe-area pb-20">
        {children}
      </main>

      <footer className="border-t py-4 bg-white/80 backdrop-blur-md mt-auto">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-set-gray mb-2 sm:mb-0 font-sans">
            SET® is a registered trademark of Cannei, LLC.
          </p>
          <div className="flex items-center gap-3">
            <p className="text-xs text-set-gray font-sans">
              Detector by <a href="https://github.com/omamitai" className="text-set-purple hover:underline">Omamitai</a>
            </p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;

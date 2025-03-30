
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Github, Info, Share2 } from "lucide-react";

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
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
        }
        
        body {
          -webkit-tap-highlight-color: transparent;
          height: 100%;
          overscroll-behavior-y: none;
        }
        
        .bg-set-gradient {
          background-attachment: fixed;
          background-image: 
            radial-gradient(at 20% 30%, rgba(88, 86, 214, 0.08) 0px, transparent 50%), 
            radial-gradient(at 80% 20%, rgba(88, 86, 214, 0.05) 0px, transparent 50%),
            radial-gradient(at 50% 70%, rgba(88, 86, 214, 0.03) 0px, transparent 50%);
          background-color: #FAFAFA;
        }
        
        .bg-pattern-dots {
          background-image: radial-gradient(rgba(88, 86, 214, 0.08) 1px, transparent 1px);
          background-size: 12px 12px;
        }
        
        /* SET icons styling - more refined */
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

      <main className="flex-grow mobile-safe-area pb-8 md:pb-16">
        {children}
      </main>

      <footer className="border-t border-gray-100 py-4 bg-white/80 backdrop-blur-md mt-auto">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-2 sm:mb-0 font-sans">
            SET® is a registered trademark of Cannei, LLC.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://www.setgame.com/sites/default/files/instructions/SET%20INSTRUCTIONS%20-%20ENGLISH.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-set-purple transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" />
                <span>Rules</span>
              </div>
            </a>
            
            <a 
              href="https://github.com/omamitai/set-detector"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-set-purple transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </div>
            </a>
            
            <p className="text-xs text-gray-500 font-sans">
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

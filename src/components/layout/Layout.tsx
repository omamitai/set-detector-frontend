
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Github, Info, ExternalLink, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
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
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gray-50">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        
        body {
          -webkit-tap-highlight-color: transparent;
          height: 100%;
          overscroll-behavior-y: none;
          background-color: #F9FAFB;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          html, body {
            overflow-x: hidden;
          }
          
          /* Improved spacing for iOS devices */
          body {
            padding-bottom: env(safe-area-inset-bottom, 20px);
          }
          
          /* Better tap targets */
          button, a, .clickable {
            min-height: 40px;
            min-width: 40px;
          }
        }
      `}
      </style>

      {/* Enhanced iOS-style top navigation bar with glass effect */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800 bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">SET Detector</h1>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://github.com/omamitai", "_blank")}
              className="bg-white/90 text-gray-700 border border-gray-200 rounded-full h-8 px-3 text-xs shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 hover:bg-gray-50"
            >
              <Github className="h-3.5 w-3.5 mr-1.5 text-gray-700" />
              <span>GitHub</span>
            </Button>
            
            <Button 
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="bg-gradient-to-r from-red-500 to-amber-500 text-white border-0 rounded-full h-8 px-3 text-xs shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <Share2 className="h-3.5 w-3.5 mr-1.5 text-white" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="border-t border-gray-100 py-3 bg-white/80 backdrop-blur-xl sticky bottom-0 mt-auto z-20 w-full shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500 font-sans">
            SET® is a registered trademark of Cannei, LLC.
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-sans flex items-center">
              Detector by <a href="https://github.com/omamitai" className="flex items-center ml-1 text-gray-600 hover:text-gray-800 transition-colors">
                <Github className="h-3.5 w-3.5 mr-1" />
                omamitai
              </a>
            </span>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;

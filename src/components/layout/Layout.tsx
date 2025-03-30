
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Github, Info, Share2, ExternalLink } from "lucide-react";
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
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-futuristic-gradient">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        
        :root {
          --primary-purple: #8B5CF6;
          --primary-violet: #7C3AED;
          --primary-indigo: #6366F1;
          --primary-blue: #3B82F6;
          --accent-teal: #14B8A6;
          --accent-pink: #EC4899;
          --accent-amber: #F59E0B;
          --dark-slate: #1E293B;
          --neutral-slate: #64748B;
          --light-slate: #CBD5E1;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
        }
        
        body {
          -webkit-tap-highlight-color: transparent;
          height: 100%;
          overscroll-behavior-y: none;
        }
        
        .bg-futuristic-gradient {
          background-attachment: fixed;
          background-image: 
            radial-gradient(at 0% 0%, rgba(124, 58, 237, 0.12) 0px, transparent 50%), 
            radial-gradient(at 100% 0%, rgba(59, 130, 246, 0.08) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.10) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(20, 184, 166, 0.05) 0px, transparent 50%);
          background-color: #F8FAFC;
        }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
        }
        
        .neo-button {
          background: linear-gradient(135deg, var(--primary-violet), var(--primary-indigo));
          border: none;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          transition: all 0.3s ease;
        }
        
        .neo-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
        }
        
        .neo-button-secondary {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(203, 213, 225, 0.7);
          box-shadow: 0 4px 12px rgba(100, 116, 139, 0.1);
        }
        
        .neo-button-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(100, 116, 139, 0.15);
        }
        
        /* Add height for bottom safe area on mobile */
        .h-safe-bottom {
          height: env(safe-area-inset-bottom, 20px);
        }
        
        /* Ensure proper spacing for mobile bottom buttons */
        .pb-mobile-actions {
          padding-bottom: calc(85px + env(safe-area-inset-bottom, 20px));
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
          
          /* Ensure footer is visible on mobile */
          .pb-mobile-actions {
            padding-bottom: calc(70px + env(safe-area-inset-bottom, 20px));
          }
        }
      `}
      </style>

      <main className={`flex-grow mobile-safe-area pb-8 md:pb-16 ${isMobile ? 'pb-mobile-actions' : ''}`}>
        {children}
      </main>

      <footer className="border-t border-gray-100/50 py-4 bg-white/60 backdrop-blur-lg shadow-md mt-auto z-20 w-full">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 mb-2 sm:mb-0 font-sans">
            SET® is a registered trademark of Cannei, LLC.
          </p>
          
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://www.setgame.com/sites/default/files/instructions/SET%20INSTRUCTIONS%20-%20ENGLISH.pdf", "_blank")}
              className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-full border border-primary-indigo/20 text-primary-indigo hover:bg-white hover:border-primary-indigo/30 shadow-sm transition-all duration-300 h-8 px-3"
            >
              <Info className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs">SET Game Rules</span>
              <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
            </Button>
            
            <Button 
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="bg-gradient-to-br from-primary-indigo/90 to-primary-violet/90 text-white border-0 rounded-full shadow-md hover:shadow-lg transition-all duration-300 h-8 px-3"
            >
              <Share2 className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs">Share this tool</span>
            </Button>
            
            <a 
              href="https://github.com/omamitai/set-detector"
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-dark-slate/90 to-dark-slate/80 text-white text-xs rounded-full flex items-center gap-1.5 px-3 py-1.5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
            
            <p className="text-xs text-gray-500 font-sans">
              Detector by <a href="https://github.com/omamitai" className="text-primary-violet hover:underline">Omamitai</a>
            </p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;


import React from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 ios-bg">
      <style>
        {`
        @import url('https://fonts.cdnfonts.com/css/sf-pro-display');
        
        :root {
          --set-primary: #9747FF;
          --set-secondary: #42CEB4;
          --set-accent: #FF5C87;
          font-family: 'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          letter-spacing: -0.015em;
        }
        
        body {
          -webkit-tap-highlight-color: transparent;
          height: 100%;
          overscroll-behavior-y: none;
        }
        
        .sf-pro-display {
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          letter-spacing: -0.015em;
        }
        
        .sf-pro-text {
          font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          letter-spacing: -0.01em;
        }
        
        .ios-bg {
          background-attachment: fixed;
          background-image: 
            radial-gradient(at 10% 20%, rgba(151, 71, 255, 0.35) 0px, transparent 70%), 
            radial-gradient(at 90% 30%, rgba(66, 206, 180, 0.35) 0px, transparent 70%),
            radial-gradient(at 50% 80%, rgba(255, 92, 135, 0.3) 0px, transparent 65%);
        }
        
        .ios-card {
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
          border: none;
          backdrop-filter: blur(5px);
          background-color: rgba(255, 255, 255, 0.8);
        }
        
        .purple-button {
          background: linear-gradient(to bottom, #9F57FF, #8E47F5);
          color: white;
          box-shadow: 0 8px 16px rgba(151, 71, 255, 0.25), 0 2px 4px rgba(151, 71, 255, 0.2);
          border-radius: 16px;
          border: none;
          padding: 12px 20px;
          font-weight: 500;
          transition: all 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        
        .purple-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 25px rgba(151, 71, 255, 0.3), 0 4px 6px rgba(151, 71, 255, 0.2);
        }
        
        .purple-button:active {
          transform: scale(0.98);
        }
        
        /* SET icons styling */
        .set-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          font-size: 1.2rem;
          line-height: 1;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .ios-card {
            border-radius: 14px;
          }
          
          .purple-button {
            border-radius: 14px;
            padding: 14px 20px;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }
          
          .mobile-safe-area {
            padding-bottom: env(safe-area-inset-bottom, 16px);
            padding-top: env(safe-area-inset-top, 0);
            padding-left: env(safe-area-inset-left, 16px);
            padding-right: env(safe-area-inset-right, 16px);
          }
          
          .fixed-bottom-button {
            position: fixed;
            bottom: env(safe-area-inset-bottom, 16px);
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% - 32px);
            z-index: 50;
          }
        }
        
        /* Animations */
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0.3; }
          50% { opacity: 0.7; }
          100% { transform: translateY(100%); opacity: 0.3; }
        }
        
        .scan-line {
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(151, 71, 255, 0.2),
            rgba(151, 71, 255, 0.4),
            rgba(151, 71, 255, 0.2),
            transparent
          );
          animation: scan 2s linear infinite;
        }
      `}
      </style>

      <header className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto py-3 px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 sf-pro-display">
            <div className="flex items-center">
              <div className="flex space-x-1 mr-2">
                <div className="set-icon text-set-purple">◇</div>
                <div className="set-icon text-set-red">○</div>
                <div className="set-icon text-set-green">△</div>
              </div>
              <h1 className="font-medium text-lg text-gray-900">SET Detector</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">            
            <a 
              href="https://github.com/omamitai/set-detector"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon" className="rounded-full text-indigo-800">
                <Github className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow mobile-safe-area">
        {children}
      </main>

      <footer className="border-t py-4 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mb-2 sm:mb-0 sf-pro-text">
            SET® is a registered trademark of Cannei, LLC.
          </p>
          <div className="flex items-center gap-3">
            <p className="text-xs text-muted-foreground sf-pro-text">
              SET Detector © Omamitai. All rights reserved.
            </p>
            <a
              href="https://github.com/omamitai/set-detector"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4 mr-1" />
              View on GitHub
            </a>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;

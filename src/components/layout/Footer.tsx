
import React from 'react';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-4 px-4 mt-auto bg-white/70 backdrop-blur-sm border-t border-gray-100 shadow-sm">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <span>© {currentYear} SET Detector</span>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/omamitai/set-detector"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-primary-purple transition-colors"
          >
            <Github size={14} />
            <span>Source Code</span>
          </a>
          
          <a
            href="https://github.com/omamitai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-purple transition-colors"
          >
            @omamitai
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

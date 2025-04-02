
import React from 'react';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-4 px-4 mt-auto bg-white/70 backdrop-blur-sm border-t border-gray-100 shadow-sm">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div className="flex flex-col text-center sm:text-left gap-1">
          <span>SET® is a registered trademark of Cannei, LLC. All rights reserved.</span>
          <span>Used under license from Set Enterprises, Inc.</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 sm:mt-0">
          <div className="flex items-center">
            <span>SET Detector by </span>
            <a
              href="https://github.com/omamitai"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-medium hover:text-primary-purple transition-colors"
            >
              @omamitai
            </a>
          </div>
          
          <a 
            href="https://github.com/omamitai/set-detector"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            <Github size={14} />
            <span className="font-medium">Source Code</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

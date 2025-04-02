
import React from 'react';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-3 px-4 mt-auto bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-sm">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
        <div className="flex flex-col text-center sm:text-left">
          <span>SET® is a registered trademark of Cannei, LLC.</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 sm:mt-0">
          <div className="flex items-center">
            <span>SET Detector by </span>
            <a
              href="https://github.com/omamitai"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-medium text-primary-purple hover:text-primary-violet transition-colors"
            >
              @omamitai
            </a>
          </div>
          
          <a 
            href="https://github.com/omamitai/set-detector"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors duration-200 hover:shadow-sm"
          >
            <Github size={14} className="text-primary-purple" />
            <span className="font-medium">Source Code</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

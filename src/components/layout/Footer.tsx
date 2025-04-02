
import React from 'react';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-5 px-4 mt-auto bg-white/90 backdrop-blur-md border-t border-gray-100">
      <div className="container max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left side with SET trademark */}
          <div className="flex items-center">
            <span className="text-sm text-gray-600">
              SET® is a registered trademark of Cannei, LLC.
            </span>
          </div>
          
          {/* Right side with author and GitHub link */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center text-sm text-gray-600 whitespace-nowrap">
              <span className="inline-block">Created by</span>
              <a
                href="https://github.com/omamitai"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 font-medium text-primary-purple hover:text-primary-violet transition-colors inline-block"
              >
                @omamitai
              </a>
            </div>
            
            <a 
              href="https://github.com/omamitai/set-detector"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                bg-white border border-gray-200 hover:bg-gray-50 
                text-gray-700 text-sm font-medium shadow-sm
                transition-all duration-200 hover:shadow"
            >
              <Github size={15} className="text-primary-purple" />
              <span>Source</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

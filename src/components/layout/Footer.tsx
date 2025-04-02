
import React from 'react';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-5 px-4 mt-auto bg-white/90 backdrop-blur-md border-t border-gray-100">
      <div className="container max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Trademark section */}
          <div className="text-sm text-gray-600 text-center md:text-left">
            SET® is a registered trademark of Cannei, LLC.
          </div>
          
          {/* Author and GitHub link section */}
          <div className="flex items-center gap-3">
            <div className="flex items-center text-sm text-gray-600">
              <span>Created by</span>
              <a
                href="https://github.com/omamitai"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1.5 font-medium text-primary-purple hover:text-primary-violet transition-colors"
              >
                @omamitai
              </a>
            </div>
            
            <a 
              href="https://github.com/omamitai/set-detector"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                bg-white border border-gray-200 hover:bg-gray-50 
                text-gray-700 text-sm font-medium shadow-sm
                transition-all duration-200 hover:shadow"
            >
              <Github size={14} className="text-primary-purple" />
              <span>Source</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

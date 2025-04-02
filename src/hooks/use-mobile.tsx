
import { useState, useEffect } from "react";

/**
 * Custom hook that detects if the current device is mobile
 * Uses a combination of screen width and user agent for more reliable detection
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initial check
    checkIfMobile();
    
    // Add resize event listener
    window.addEventListener("resize", checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const checkIfMobile = () => {
    // Check screen width (primary method)
    const isMobileWidth = window.innerWidth < 768;
    
    // Check user agent (secondary method)
    const userAgentCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    // Check touchscreen capability
    const isTouchCapable = 'ontouchstart' in window || 
                          navigator.maxTouchPoints > 0 || 
                          (navigator as any).msMaxTouchPoints > 0;
    
    // Combine checks: screen width is primary, others are secondary signals
    setIsMobile(isMobileWidth || (userAgentCheck && isTouchCapable));
  };

  return isMobile;
}

export default useIsMobile;

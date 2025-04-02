
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="bg-gradient-full"></div>
      <div className="min-h-screen">
        {children}
      </div>
      
      <style>
        {`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
  
  body {
    -webkit-tap-highlight-color: transparent;
    height: 100%;
    overscroll-behavior-y: none;
    background-color: transparent !important;
    margin: 0;
    padding: 0;
  }
  
  /* Enhanced mobile optimizations */
  @media (max-width: 640px) {
    html, body {
      overflow-x: hidden;
      background-color: transparent !important;
    }
    
    body {
      padding-bottom: env(safe-area-inset-bottom, 20px);
    }
    
    /* Better tap targets */
    button, a, .clickable {
      min-height: 44px;
      min-width: 44px;
    }
  }
  
  /* Fixed gradient background that properly covers the entire screen including notch area */
  .bg-gradient-full {
    background: linear-gradient(135deg, rgba(248, 245, 255, 0.85) 0%, rgba(242, 235, 255, 0.7) 100%);
    background-attachment: fixed;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -10;
    margin: 0;
    padding: 0;
    width: 100vw; 
    height: 100vh;
    height: 100dvh; /* dynamic viewport height - handles mobile browsers better */
  }

  /* Fix for iPhone notch area */
  @supports (padding-top: env(safe-area-inset-top)) {
    .bg-gradient-full {
      padding-top: env(safe-area-inset-top);
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
      padding-bottom: env(safe-area-inset-bottom);
      margin: 0;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
`}
      </style>
    </>
  );
};

export default Layout;


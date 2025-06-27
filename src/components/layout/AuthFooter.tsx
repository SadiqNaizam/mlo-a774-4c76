import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooter: React.FC = () => {
  console.log('AuthFooter loaded');
  
  return (
    <footer className="w-full py-4 px-4 sm:px-6 lg:px-8 mt-auto border-t">
      <div className="container mx-auto flex justify-center items-center gap-4 sm:gap-6">
        <Link 
          to="/terms-of-service" 
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Terms of Service
        </Link>
        <span className="text-border" aria-hidden="true">|</span>
        <Link 
          to="/privacy-policy" 
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default AuthFooter;
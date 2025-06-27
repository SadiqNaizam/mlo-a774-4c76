import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const AuthHeader: React.FC = () => {
  console.log('AuthHeader loaded');
  
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xl font-bold text-foreground transition-colors"
          aria-label="Go to homepage"
        >
          <Zap className="h-6 w-6 text-primary" />
          <span>SwiftSign-In</span>
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;
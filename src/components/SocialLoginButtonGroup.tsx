import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Chrome } from 'lucide-react';

const SocialLoginButtonGroup: React.FC = () => {
  console.log('SocialLoginButtonGroup loaded');

  const handleSocialLogin = (provider: 'google' | 'github') => {
    // In a real application, this would trigger the OAuth flow.
    console.log(`Attempting to log in with ${provider}...`);
    // Example: window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Button
        variant="outline"
        type="button"
        onClick={() => handleSocialLogin('google')}
        aria-label="Continue with Google"
      >
        <Chrome className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
      <Button
        variant="outline"
        type="button"
        onClick={() => handleSocialLogin('github')}
        aria-label="Continue with GitHub"
      >
        <Github className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>
    </div>
  );
};

export default SocialLoginButtonGroup;
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

// Custom Layout Components
import AuthHeader from '@/components/layout/AuthHeader';
import AuthFooter from '@/components/layout/AuthFooter';

// shadcn/ui Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Icons
import { LogOut, KeyRound } from 'lucide-react';

const AccountDashboard = () => {
  console.log('AccountDashboard loaded');
  const navigate = useNavigate();

  // Placeholder user data based on the user journey
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    initials: 'JD',
    // Using a placeholder image service for the avatar
    avatarUrl: 'https://avatar.vercel.sh/janedoe.png',
  };

  const handleLogout = () => {
    // In a real application, you would also clear the user's session/token here.
    toast.success('You have been successfully logged out.');
    navigate('/'); // Navigate to LoginPage as per App.tsx route for "/"
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AuthHeader />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Account Dashboard</CardTitle>
            <CardDescription>
              Welcome back! Here is your account information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
               <Button asChild variant="outline" className="w-full">
                  {/* Path from App.tsx. This button is a link. */}
                  <Link to="/forgot-password"> 
                    <KeyRound className="mr-2 h-4 w-4" />
                    Change Password
                  </Link>
                </Button>
              <Button onClick={handleLogout} variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <AuthFooter />
    </div>
  );
};

export default AccountDashboard;
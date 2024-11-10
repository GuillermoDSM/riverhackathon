'use client'

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Welcome to River Hackathon</h1>
        <p className="text-muted-foreground">Please connect your wallet to continue</p>
        <Button 
          onClick={login}
          className="px-6 py-2"
        >
          Connect Wallet
        </Button>
      </div>
    );
  }

  return <>{children}</>;
} 
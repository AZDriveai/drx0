'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Icons } from './icons';

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestAccess = async () => {
    setIsGuestLoading(true);
    try {
      await signIn('credentials', { callbackUrl: '/' });
    } catch (error) {
      console.error('Error accessing as guest:', error);
    } finally {
      setIsGuestLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-4 sm:px-16">
      <Button
        onClick={handleGoogleSignIn}
        disabled={isLoading || isGuestLoading}
        className="w-full"
        variant="outline"
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        تسجيل الدخول بـ Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">أو</span>
        </div>
      </div>

      <Button
        onClick={handleGuestAccess}
        disabled={isLoading || isGuestLoading}
        className="w-full"
        variant="secondary"
      >
        {isGuestLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.user className="mr-2 h-4 w-4" />
        )}
        الدخول كضيف
      </Button>
    </div>
  );
}

'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, status, router]);

  // Save access token to localStorage when session is available
  useEffect(() => {
    if (session?.accessToken && typeof window !== 'undefined') {
      localStorage.setItem('auth-token', session.accessToken);
    }
  }, [session?.accessToken]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('/login-back.jpg')] bg-cover">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary mx-auto"></div>
          <p className="mt-4 text-primary font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}

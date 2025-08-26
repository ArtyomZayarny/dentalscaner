'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    console.log('HomePage useEffect - status:', status, 'session:', !!session, 'hasRedirected:', hasRedirected);
    
    // Prevent multiple redirects
    if (hasRedirected) {
      console.log('Already redirected, skipping...');
      return;
    }
    
    // Only redirect when we have a definitive status
    if (status === 'loading') {
      console.log('Still loading, waiting...');
      return;
    }

    if (status === 'authenticated') {
      console.log('Redirecting to dashboard...');
      setHasRedirected(true);
      router.replace('/dashboard');
    } else if (status === 'unauthenticated') {
      console.log('Redirecting to sign-in...');
      setHasRedirected(true);
      router.replace('/sign-in');
    }
  }, [status, router, hasRedirected]);

  // Fallback: if we're stuck loading for more than 3 seconds, redirect to sign-in
  useEffect(() => {
    if (hasRedirected) return;
    
    const timeout = setTimeout(() => {
      if (status === 'loading') {
        console.log('Timeout reached, forcing redirect to sign-in');
        setHasRedirected(true);
        router.replace('/sign-in');
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [status, router, hasRedirected]);

  // Always show loading while determining redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/login-back.jpg')] bg-cover">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading... Status: {status}</p>
      </div>
    </div>
  );
}

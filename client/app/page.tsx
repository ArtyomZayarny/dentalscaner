'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log('HomePage useEffect - status:', status, 'session:', !!session);
    
    // Only redirect when we have a definitive status
    if (status === 'loading') {
      console.log('Still loading, waiting...');
      return;
    }

    if (status === 'authenticated') {
      console.log('Redirecting to dashboard...');
      router.replace('/dashboard');
    } else if (status === 'unauthenticated') {
      console.log('Redirecting to sign-in...');
      // Use setTimeout to ensure the redirect happens after the component is fully rendered
      setTimeout(() => {
        window.location.href = '/sign-in';
      }, 100);
    }
  }, [status, router]);

  // Fallback: if we're stuck loading for more than 3 seconds, redirect to sign-in
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (status === 'loading') {
        console.log('Timeout reached, forcing redirect to sign-in');
        window.location.href = '/sign-in';
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [status]);

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

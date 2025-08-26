'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const hasRedirected = useRef(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (hasRedirected.current) return; // Prevent multiple redirects

    if (status === 'authenticated' && session) {
      hasRedirected.current = true;
      router.push('/dashboard');
    } else if (status === 'unauthenticated') {
      hasRedirected.current = true;
      router.push('/sign-in');
    }
  }, [session, status, router]);

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('/login-back.jpg')] bg-cover">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show redirecting message for unauthenticated users
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('/login-back.jpg')] bg-cover">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to sign-in...</p>
        </div>
      </div>
    );
  }

  // This should not be reached, but just in case
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/login-back.jpg')] bg-cover">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

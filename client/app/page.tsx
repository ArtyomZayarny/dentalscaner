'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard');
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

  // Show homepage for unauthenticated users
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/login-back.jpg')] bg-cover">
      <div className="text-center bg-white/80 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Dentalscaner</h1>
        <p className="text-gray-700 mb-6">Welcome to the dental appointment system</p>
        <div className="space-y-4">
          <Link
            href="/sign-in"
            className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/test"
            className="block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Test Page
          </Link>
        </div>
      </div>
    </div>
  );
}

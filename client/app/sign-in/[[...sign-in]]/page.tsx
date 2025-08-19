'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleDemoSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signIn('credentials', {
      email,
      password,
      callbackUrl: '/dashboard',
    });
  };

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/login-back.jpg')] bg-cover py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/70 p-6 rounded-md">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-extrabold text-gray-900">Welcome to Dentalscaner</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        <div className="space-y-4">
          {/* Google Sign In - only show if Google provider is available */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/70 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Demo Login Form */}
          <form onSubmit={handleDemoSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="demo@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="any password"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Demo Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

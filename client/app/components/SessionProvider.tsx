'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface SessionProviderProps {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: SessionProviderProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log('SessionProvider mounted');
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading App</h1>
          <p className="text-gray-700">There was an error loading the application.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}

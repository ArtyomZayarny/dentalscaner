'use client';

import { useEffect, useState } from 'react';

interface ClerkErrorBoundaryProps {
  children: React.ReactNode;
}

export default function ClerkErrorBoundary({ children }: ClerkErrorBoundaryProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Простая задержка для загрузки Clerk
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('/login-back.jpg')] bg-cover">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

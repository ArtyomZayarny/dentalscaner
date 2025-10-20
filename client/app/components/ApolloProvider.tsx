'use client';

import { ApolloProvider as BaseApolloProvider, ApolloClient } from '@apollo/client';
import { getApolloClient } from '@/lib/apollo-client';
import { useState, useEffect } from 'react';

interface ApolloProviderProps {
  children: React.ReactNode;
}

export default function ApolloProvider({ children }: ApolloProviderProps) {
  const [client, setClient] = useState<ApolloClient<unknown> | null>(null);

  useEffect(() => {
    setClient(getApolloClient());
  }, []);

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary mb-4"></div>
        <p className="text-primary font-medium">Loading...</p>
      </div>
    );
  }

  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}

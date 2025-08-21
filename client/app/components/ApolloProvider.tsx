'use client';

import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import { getApolloClient } from '@/lib/apollo-client';
import { useState, useEffect } from 'react';

interface ApolloProviderProps {
  children: React.ReactNode;
}

export default function ApolloProvider({ children }: ApolloProviderProps) {
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    setClient(getApolloClient());
  }, []);

  if (!client) {
    return <div>Loading...</div>;
  }

  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}

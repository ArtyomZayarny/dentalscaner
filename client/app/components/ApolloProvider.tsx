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
    return <div>Loading...</div>;
  }

  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let client: ApolloClient<unknown> | null = null;

export function getApolloClient() {
  if (!client) {
    // Determine the GraphQL URL based on environment
    let graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL;

    // If no environment variable is set, try to determine the URL
    if (!graphqlUrl) {
      if (typeof window !== 'undefined') {
        // In browser, use the same origin for the API
        const protocol = window.location.protocol;
        const host = window.location.host;
        graphqlUrl = `${protocol}//${host.replace('dentalscaner-fe', 'dentalscaner-be')}/graphql`;
      } else {
        // Fallback for server-side rendering
        graphqlUrl = 'http://localhost:3001/graphql';
      }
    }

    const httpLink = createHttpLink({
      uri: graphqlUrl,
    });

    const authLink = setContext((_, { headers }) => {
      // Get the authentication token from local storage if it exists
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all',
        },
        query: {
          errorPolicy: 'all',
        },
      },
    });
  }

  return client;
}

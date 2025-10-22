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
        // In browser, use environment-based URL construction
        const isProduction = process.env.NODE_ENV === 'production';
        const isVercel = process.env.VERCEL === '1';

        if (isProduction || isVercel) {
          // Use environment variable or construct from current domain
          const currentHost = window.location.hostname;
          if (currentHost === 'dentalscaner-fe.vercel.app') {
            graphqlUrl = 'https://dentalscaner-three.vercel.app/graphql';
          } else {
            // Fallback for other production domains
            graphqlUrl = 'https://dentalscaner-three.vercel.app/graphql';
          }
        } else {
          // Development environment
          graphqlUrl = 'http://localhost:3001/graphql';
        }
      } else {
        // Fallback for server-side rendering
        graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3001/graphql';
      }
    }

    const httpLink = createHttpLink({
      uri: graphqlUrl,
      credentials: 'include', // Include credentials for CORS
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
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              appointments: {
                merge(_existing = [], incoming) {
                  return incoming;
                },
              },
              appointmentsByUserId: {
                merge(_existing = [], incoming) {
                  return incoming;
                },
              },
              appointment: {
                merge(_existing, incoming) {
                  return incoming;
                },
              },
            },
          },
        },
      }),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all',
          fetchPolicy: 'no-cache',
        },
        query: {
          errorPolicy: 'all',
          fetchPolicy: 'no-cache',
        },
      },
    });
  }

  return client;
}

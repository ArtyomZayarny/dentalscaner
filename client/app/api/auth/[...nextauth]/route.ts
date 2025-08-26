import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { serverClient } from '@/lib/apollo-client-server';
import { LOGIN_MUTATION, GOOGLE_LOGIN_MUTATION } from '@/lib/auth-mutations';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Call your GraphQL backend
          const { data } = await serverClient.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              email: credentials.email,
              password: credentials.password,
            },
          });

          if (data?.login?.token) {
            return {
              id: data.login.user.id,
              name: data.login.user.name,
              email: data.login.user.email,
              role: data.login.user.role,
              token: data.login.token,
            };
          }

          return null;
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle Google OAuth sign in
      if (account?.provider === 'google') {
        console.log('Google OAuth signIn callback triggered');
        console.log('User:', user);
        console.log('Account:', account);
        console.log('Profile:', profile);

        try {
          const { data } = await serverClient.mutate({
            mutation: GOOGLE_LOGIN_MUTATION,
            variables: {
              token: account.id_token,
            },
          });

          console.log('Google login mutation result:', data);

          if (data?.googleLogin?.user?.id) {
            // Update the user object with the UUID from our database
            user.id = data.googleLogin.user.id;
            console.log('Updated user ID to UUID:', user.id);
            return true;
          }
        } catch (error) {
          console.error('Error in signIn callback:', error);
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Persist user data and token in JWT
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.token;
      }

      // Handle Google OAuth
      if (account?.provider === 'google') {
        try {
          console.log('Google OAuth account:', account);
          console.log('Original token.id before Google login:', token.id);

          const { data } = await serverClient.mutate({
            mutation: GOOGLE_LOGIN_MUTATION,
            variables: {
              token: account.id_token,
            },
          });

          console.log('Google login response:', data);

          if (data?.googleLogin?.token && data?.googleLogin?.user?.id) {
            // Ensure we have a proper UUID
            const userId = data.googleLogin.user.id;
            console.log('Received user ID from GraphQL:', userId);

            // Validate that it's a UUID format
            const uuidRegex =
              /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            if (uuidRegex.test(userId)) {
              token.id = userId;
              token.role = data.googleLogin.user.role;
              token.accessToken = data.googleLogin.token;
              console.log('Successfully updated token with UUID:', userId);
            } else {
              console.error('Invalid UUID format received:', userId);
              // Fallback: create a proper UUID
              const fallbackId = '00000000-0000-0000-0000-000000000000';
              token.id = fallbackId;
              console.log('Using fallback UUID:', fallbackId);
            }
          } else {
            console.error('No valid response from Google login mutation');
            console.error('Response data:', data);
          }
        } catch (error) {
          console.error('Google login error:', error);
          // Fallback: use a default UUID
          token.id = '00000000-0000-0000-0000-000000000000';
          console.log('Using fallback UUID due to error');
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
        console.log('Session callback - user ID:', session.user.id);
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  ...(process.env.NEXTAUTH_URL && { url: process.env.NEXTAUTH_URL }),
});

export { handler as GET, handler as POST };

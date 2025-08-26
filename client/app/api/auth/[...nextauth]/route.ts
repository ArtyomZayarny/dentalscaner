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
          const { data } = await serverClient.mutate({
            mutation: GOOGLE_LOGIN_MUTATION,
            variables: {
              token: account.id_token,
            },
          });

          console.log('Google login response:', data);

          if (data?.googleLogin?.token) {
            token.id = data.googleLogin.user.id;
            token.role = data.googleLogin.user.role;
            token.accessToken = data.googleLogin.token;
            console.log('Updated token with UUID:', data.googleLogin.user.id);
          } else {
            console.error('No token in Google login response');
          }
        } catch (error) {
          console.error('Google login error:', error);
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

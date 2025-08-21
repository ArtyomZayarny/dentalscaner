import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { client } from '@/lib/apollo-client';
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
          const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              email: credentials.email,
              password: credentials.password,
            },
          });

          if (data?.login?.token) {
            // Store the token for GraphQL requests
            if (typeof window !== 'undefined') {
              localStorage.setItem('auth-token', data.login.token);
            }

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
          const { data } = await client.mutate({
            mutation: GOOGLE_LOGIN_MUTATION,
            variables: {
              token: account.id_token,
            },
          });

          if (data?.googleLogin?.token) {
            if (typeof window !== 'undefined') {
              localStorage.setItem('auth-token', data.googleLogin.token);
            }

            token.id = data.googleLogin.user.id;
            token.role = data.googleLogin.user.role;
            token.accessToken = data.googleLogin.token;
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

import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { serverClient } from '@/lib/apollo-client-server';
import { LOGIN_MUTATION, GOOGLE_LOGIN_MUTATION } from '@/lib/auth-mutations';

export const authOptions: NextAuthOptions = {
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
          const { data } = await serverClient.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              email: credentials.email,
              password: credentials.password,
            },
          });

          if (data?.login?.token && data?.login?.user) {
            return {
              id: data.login.user.id,
              name: `${data.login.user.firstName} ${data.login.user.lastName}`,
              email: data.login.user.email,
              role: data.login.user.role,
              token: data.login.token,
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const { data } = await serverClient.mutate({
            mutation: GOOGLE_LOGIN_MUTATION,
            variables: {
              token: account.id_token,
            },
          });

          if (data?.googleLogin?.user?.id) {
            user.id = data.googleLogin.user.id;
            user.role = data.googleLogin.user.role;
            user.token = data.googleLogin.token;
            return true;
          }
        } catch (error) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to dashboard after successful sign-in
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  ...(process.env.NEXTAUTH_URL && { url: process.env.NEXTAUTH_URL }),
};

export default NextAuth(authOptions);

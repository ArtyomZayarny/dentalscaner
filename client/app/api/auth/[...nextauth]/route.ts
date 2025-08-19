import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    // Only add Google provider if credentials are properly configured
    ...(process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_CLIENT_ID !== 'your-google-client-id'
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: 'Demo',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Demo login - accept any email/password
        if (credentials?.email && credentials?.password) {
          return {
            id: 'demo-user',
            name: 'Demo User',
            email: credentials.email,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

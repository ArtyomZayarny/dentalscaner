import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import SessionProvider from './components/SessionProvider';
import ApolloProvider from './components/ApolloProvider';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';

const montseratSans = Montserrat({
  variable: '--montserrat-sans',
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  title: 'Dentalscaner',
  description: 'Dental heath',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <script src="https://js.stripe.com/v3/" async></script>
      </head>
      <body className={montseratSans.variable}>
        <ApolloProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}

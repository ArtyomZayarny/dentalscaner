import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import SessionProvider from './components/SessionProvider';
import ApolloProvider from './components/ApolloProvider';

const montseratSans = Montserrat({
  variable: '--montserrat-sans',
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  title: 'Dentalscaner',
  description: 'Dental heath',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={montseratSans.variable}>
        <ApolloProvider>
          <SessionProvider>{children}</SessionProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}

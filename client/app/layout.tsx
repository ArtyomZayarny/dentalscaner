import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import SessionProvider from './components/SessionProvider';

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
      <body className={montseratSans.variable}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

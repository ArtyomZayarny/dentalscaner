import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import './globals.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

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
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedIn>
            <div className="flex h-screen">
              {/* Sidebar */}
              <Sidebar />
              {/* Main Content */}
              <main className="flex flex-col w-full overflow-y-scroll">
                <Topbar />
                {/* Page Content */}
                <div className="px-8 py-4 bg-white">
                  <div className="mx-auto">{children}</div>
                </div>
              </main>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="min-h-screen flex items-center justify-center bg-[url('/login-back.jpg')] bg-cover">
              {children}
            </div>
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import './globals.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { AppContextProvider } from './context/appContext';
import ClerkErrorBoundary from './components/ClerkErrorBoundary';

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
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#3b82f6',
          colorBackground: '#ffffff',
        },
      }}
    >
      <html lang="en">
        <body className={montseratSans.variable}>
          <ClerkErrorBoundary>
            <SignedIn>
              <AppContextProvider>
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
              </AppContextProvider>
            </SignedIn>
            <SignedOut>
              <div className="min-h-screen flex items-center justify-center bg-[url('/login-back.jpg')] bg-cover">
                {children}
              </div>
            </SignedOut>
          </ClerkErrorBoundary>
        </body>
      </html>
    </ClerkProvider>
  );
}

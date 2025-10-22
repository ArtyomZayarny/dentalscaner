'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { AppContextProvider } from '../context/appContext';
import AuthWrapper from './AuthWrapper';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <AuthWrapper>
      <AppContextProvider>
        <div className="flex flex-col h-screen">
          {/* Header - на всю ширину экрана */}
          <Header onMenuToggle={handleMenuToggle} />
          {/* Main Layout - Sidebar + Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={isMobileMenuOpen} onClose={handleMenuClose} />

            {/* Main Content */}
            <main className="flex flex-col w-full overflow-y-scroll">
              {/* Page Content */}
              <div className="px-4 lg:px-8 py-4 bg-white">
                <div className="mx-auto">
                  {isMobileMenuOpen && (
                    <div className="text-red-500 text-sm mb-2">BLUR ACTIVE - Content blurred</div>
                  )}
                  <div
                    className={isMobileMenuOpen ? 'blur-sm' : ''}
                    style={
                      isMobileMenuOpen
                        ? {
                            filter: 'blur(4px)',
                            isolation: 'isolate',
                            position: 'relative',
                            zIndex: 1,
                          }
                        : {}
                    }
                  >
                    {children}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </AppContextProvider>
    </AuthWrapper>
  );
}

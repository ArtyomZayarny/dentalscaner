'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
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
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar isOpen={isMobileMenuOpen} onClose={handleMenuClose} />
          
          {/* Main Content */}
          <main className="flex flex-col w-full overflow-y-scroll">
            <Topbar onMenuToggle={handleMenuToggle} />
            {/* Page Content */}
            <div className="px-4 lg:px-8 py-4 bg-white">
              <div className="mx-auto">{children}</div>
            </div>
          </main>
        </div>
      </AppContextProvider>
    </AuthWrapper>
  );
}

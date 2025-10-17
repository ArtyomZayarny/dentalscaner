'use client';

import React from 'react';
import { LogOut, Menu } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

interface TopbarProps {
  onMenuToggle?: () => void;
}

function Topbar({ onMenuToggle }: TopbarProps) {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <>
      {/* Top Bar */}
      <header
        className="bg-[#EBF4FBBF] flex items-center justify-between px-4 lg:px-8 font-semibold text-lg w-full"
        style={{ minHeight: '72px' }}
      >
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-blue-800 hover:bg-[#D1E7F5] rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop spacer */}
        <div className="hidden lg:block w-full mr-5"></div>

        <div className="flex gap-4 items-center">
          {/* Logout button */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={handleSignOut}
              className="flex items-center text-white hover:text-gray-200 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Topbar;

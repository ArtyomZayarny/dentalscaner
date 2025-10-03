'use client';

import React from 'react';
import { BellIcon, LogOut, Menu } from 'lucide-react';
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
      <header className="bg-blue-700 flex items-center justify-between px-4 lg:px-8 py-4 font-semibold text-lg w-full">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-white hover:bg-blue-600 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop spacer */}
        <div className="hidden lg:block w-full mr-5"></div>

        <div className="flex gap-4 items-center">
          {/*Notification icon */}
          <div className="cursor-pointer relative w-10 h-10 flex items-center justify-center p-2">
            <div className="w-[20px] h-[20px] bg-[#EBF4FB] rounded-full flex items-center justify-center absolute -top-2 -right-2 border border-gray-500/20">
              <span className="text-[#3687C0] text-xs">9</span>
            </div>

            <BellIcon className="text-white" />
          </div>

          {/* User info and logout */}
          <div className="flex items-center gap-3">
            <div className="text-white text-sm hidden sm:block">
              {session?.user?.name || session?.user?.email}
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Topbar;

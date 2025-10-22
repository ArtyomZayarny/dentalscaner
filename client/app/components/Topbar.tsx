'use client';

import React from 'react';
import { Menu } from 'lucide-react';

interface TopbarProps {
  onMenuToggle?: () => void;
}

function Topbar({ onMenuToggle }: TopbarProps) {
  return (
    <>
      {/* Top Bar */}
      <header
        className="bg-primary flex items-center justify-between px-4 lg:px-8 font-semibold text-lg w-full"
        style={{ minHeight: '72px' }}
      >
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-primary-foreground hover:bg-primary/80 rounded-lg transition-colors cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop spacer */}
        <div className="hidden lg:block w-full mr-5"></div>
      </header>
    </>
  );
}

export default Topbar;

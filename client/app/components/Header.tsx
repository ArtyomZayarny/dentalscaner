'use client';
import Link from 'next/link';
import Image from 'next/image';
import { LogOut, Menu } from 'lucide-react';
import { signOut } from 'next-auth/react';

interface HeaderProps {
  onMenuToggle?: () => void;
}

function Header({ onMenuToggle }: HeaderProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <header
      className="bg-primary flex items-center justify-between px-4 lg:px-8 font-semibold text-lg w-full relative z-50"
      style={{ minHeight: '72px' }}
    >
      {/* Left side - Logo */}
      <Link href={'/'} className="flex gap-1 items-center">
        <Image
          width={34}
          height={30}
          src={'/dentalscaner-logo.svg'}
          alt="dentalscaner-logo"
          className="mr-2"
        />
        <span className="font-bold text-2xl text-white">DentalCare</span>
      </Link>

      {/* Right side - Mobile menu button and Sign Out */}
      <div className="flex gap-4 items-center">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-primary-foreground hover:bg-primary/80 rounded-lg transition-colors cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Sign Out button - только на desktop */}
        <button
          onClick={handleSignOut}
          className="hidden lg:flex items-center text-primary-foreground hover:text-white/80 transition-colors cursor-pointer"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

export default Header;

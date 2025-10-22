'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Home, Calendar, Settings, User, Stethoscope, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    { href: '/', icon: Home, label: 'Overview' },
    { href: '/appointments', icon: Calendar, label: 'Appointments' },
    { href: '/procedure', icon: Settings, label: 'Procedures' },
    { href: '/doctors', icon: Stethoscope, label: 'Doctors' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
    if (isMobile && onClose) {
      onClose();
    }
  };

  // Desktop sidebar
  if (!isMobile) {
    return (
      <aside className="max-w-[258px] box-border bg-primary/10 border-r border-primary flex flex-col w-full">
        <div className="flex-1 px-8 py-6">
          {/* Navigation */}
          <nav className="flex flex-col gap-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium shadow-sm'
                      : 'hover:bg-primary/10 hover:text-primary text-gray-700 cursor-pointer'
                  }`}
                >
                  <Icon className="mr-3 w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    );
  }

  // Mobile sidebar with overlay
  return (
    <>
      {/* Blur overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`
        fixed top-[72px] left-0 h-[calc(100vh-72px)] w-80 max-w-[85vw] bg-white border-r border-primary 
        transform transition-transform duration-300 ease-in-out z-50 lg:hidden flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className="flex-1 px-8 py-6">
          {/* Navigation */}
          <nav className="flex flex-col gap-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium shadow-sm'
                      : 'hover:bg-primary/10 hover:text-primary text-gray-700 cursor-pointer'
                  }`}
                >
                  <Icon className="mr-3 w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Sign Out button для мобильных устройств */}
          <div className="mt-8">
            <button
              onClick={handleSignOut}
              className="flex items-center px-6 py-3 rounded-lg transition-colors hover:bg-gray-100 text-gray-700 w-full cursor-pointer"
            >
              <LogOut className="mr-3 w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

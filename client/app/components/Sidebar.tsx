'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Home, Calendar, Settings, User, Stethoscope } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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

  // Desktop sidebar
  if (!isMobile) {
    return (
      <aside className="max-w-[258px] box-border bg-white border-r border-blue-500 flex flex-col w-full">
        <div className="flex items-center px-6 py-5 border-b bg-blue-700">
          <Link href={'/'} className="flex gap-1 justify-center">
            <Image
              width={34}
              height={30}
              src={'/dentalscaner-logo.svg'}
              alt="dentalscaner-logo"
              className="mr-2"
            />
            <span className="font-bold text-2xl text-white">Dentalscaner</span>
          </Link>
        </div>
        <div className="flex-1 px-8 py-6 bg-[#EBF4FBBF]">
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
                      ? 'bg-blue-100 text-blue-700 font-medium shadow-sm'
                      : 'hover:bg-gray-100 text-gray-700'
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
        fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white border-r border-blue-500 
        transform transition-transform duration-300 ease-in-out z-50 lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className="flex items-center px-6 py-5 border-b border-blue-600 bg-blue-700">
          <Link href={'/'} className="flex gap-1 justify-center" onClick={handleLinkClick}>
            <Image
              width={34}
              height={30}
              src={'/dentalscaner-logo.svg'}
              alt="dentalscaner-logo"
              className="mr-2"
            />
            <span className="font-bold text-2xl text-white">Dentalscaner</span>
          </Link>
        </div>
        <div className="flex-1 px-8 py-6 bg-[#EBF4FBBF] flex flex-col">
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
                      ? 'bg-blue-100 text-blue-700 font-medium shadow-sm'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon className="mr-3 w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          {/* User Profile Section */}
          <div className="mt-auto pt-6">
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">N</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">User Name</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

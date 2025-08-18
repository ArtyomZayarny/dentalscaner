'use client';
import Link from 'next/link';

import { Home, Calendar, Settings, User, Stethoscope } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function Sidebar() {
  const pathname = usePathname();

  const navigationItems = [
    { href: '/', icon: Home, label: 'Overview' },
    { href: '/appointments', icon: Calendar, label: 'Appointments' },
    { href: '/procedure', icon: Settings, label: 'Procedures' },
    { href: '/doctors', icon: Stethoscope, label: 'Doctors' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

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

export default Sidebar;

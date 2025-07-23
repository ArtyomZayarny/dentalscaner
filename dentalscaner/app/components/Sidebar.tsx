import React from "react";
import Link from "next/link";

import { Home, MapPin, Calendar, CircleUser, Settings } from "lucide-react";
import Image from "next/image";

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-blue-500 flex flex-col">
      <div className="flex items-center px-6 py-5 border-b bg-blue-700">
        <Image
          width={34}
          height={30}
          src={"/dentalscaner-logo.svg"}
          alt="dentalscaner-logo"
          className="mr-2"
        />
        <span className="font-bold text-2xl text-white">Dentalscaner</span>
      </div>
      <div className="flex-1 px-8 py-6 bg-[#EBF4FBBF]">
        {/* User Info */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 rounded-full  mr-3b bg-[url('/avatar.png')] mr-4" />
          <div>
            <div className="font-medium text-base">Beatrice Winner</div>
            <div className="text-xs text-gray-500">Client</div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-10">
          <Link
            href="#"
            className="flex items-center px-6 py-2 rounded bg-blue-50 text-blue-700 font-medium"
          >
            <Home className="mr-2 w-5 h-5" /> Overview
          </Link>
          <Link
            href="#"
            className="flex items-center px-6 py-2 rounded hover:bg-gray-100"
          >
            <Calendar className="mr-2 w-5 h-5" /> Appointments
          </Link>
          <Link
            href="#"
            className="flex items-center px-6 py-2 rounded bg-blue-100 text-blue-700 font-medium"
          >
            <MapPin className="mr-2 w-5 h-5" /> Nearby Clinics
          </Link>
          <Link
            href="#"
            className="flex items-center px-6 py-2 rounded hover:bg-gray-100"
          >
            <Settings className="mr-2 w-5 h-5" /> Procedures
          </Link>
          <Link
            href="#"
            className="flex items-center px-6 py-2 rounded hover:bg-gray-100"
          >
            <CircleUser className="mr-2 w-5 h-5" />
            Profile
          </Link>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;

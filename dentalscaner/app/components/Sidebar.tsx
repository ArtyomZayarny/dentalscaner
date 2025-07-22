import React from "react";
import Link from "next/link";
import { Home, IdCard, Calendar, User, Settings } from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className="h-16 flex items-center px-6 border-b">
        <span className="font-bold text-lg text-blue-700">Dentalscaner</span>
      </div>
      <div className="flex-1 px-4 py-6">
        {/* User Info */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
          <div>
            <div className="font-semibold">Dash Clinic</div>
            <div className="text-xs text-gray-500">Clinic</div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <Link
            href="#"
            className="flex items-center px-3 py-2 rounded bg-blue-50 text-blue-700 font-medium"
          >
            <Home className="mr-2 w-5 h-5" /> Overview
          </Link>
          <Link
            href="#"
            className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
          >
            <IdCard className="mr-2 w-5 h-5" /> Procedures
          </Link>
          <Link
            href="#"
            className="flex items-center px-3 py-2 rounded bg-blue-100 text-blue-700 font-medium"
          >
            <Calendar className="mr-2 w-5 h-5" /> Schedule
          </Link>
          <Link
            href="#"
            className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
          >
            <User className="mr-2 w-5 h-5" /> Dentists
          </Link>
          <Link
            href="#"
            className="flex items-center px-3 py-2 rounded hover:bg-gray-100"
          >
            <Settings className="mr-2 w-5 h-5" /> Profile
          </Link>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;

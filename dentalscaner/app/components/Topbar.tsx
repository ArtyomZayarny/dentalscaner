import React from 'react';
import { BellIcon } from 'lucide-react';

function Topbar() {
  return (
    <>
      {/* Top Bar */}
      <header className=" bg-blue-700 flex items-center justify-between px-8 py-4  font-semibold text-lg w-full">
        {/* top panel */}
        {/* Search bar  */}
        <div className="w-full mr-5"></div>

        <div className="flex gap-4">
          {/*Notification icon */}
          <div className="cursor-pointer relative w-10 h-10 flex items-center justify-center p-2">
            <div className="w-[20px] h-[20px] bg-[#EBF4FB] rounded-full flex items-center justify-center absolute -top-2 -right-2 border border-gray-500/20">
              <span className="text-[#3687C0] text-xs">9</span>
            </div>

            <BellIcon className=" text-white" />
          </div>

          {/* User icon */}
          <div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[url('/avatar.png')] border border-white" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Topbar;

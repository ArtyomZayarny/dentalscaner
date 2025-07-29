import React from 'react';
import { BellIcon, ChevronRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

function Topbar() {
  return (
    <>
      {/* Top Bar */}
      <header className=" bg-blue-700 flex items-center justify-between px-8 py-4  font-semibold text-lg w-full">
        {/* top panel */}
        {/* Search bar  */}
        <div className="w-full mr-5">
          {/* <div className="relative flex items-center ">
            <Search className="w-5 h-5 absolute ml-2 text-gray-300" />
            <Input className="w-full px-4 py-2 border-gray-300 outline-0 pl-8 text-base text-black" />
          </div> */}
        </div>

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

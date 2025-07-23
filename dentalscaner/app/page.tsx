import React from "react";
import Sidebar from "./components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#ededed] min-h-screen">
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <main className="flex-1 flex flex-col">
            {/* Top Bar */}
            <header className="h-14 bg-white flex items-center px-8  font-semibold text-lg">
              <span>Schedule</span>
            </header>
            {/* Page Content */}
            <div className="flex-1 p-8 bg-white overflow-auto">
              <div className="max-w-4xl mx-auto">{children}</div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

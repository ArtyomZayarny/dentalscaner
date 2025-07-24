import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

function AppointmentPage() {
  return (
    <>
      {/* Greeting section */}
      <div>
        <h1>Welcome Beatrice</h1>
      </div>

      {/* Breadcrumbs section  */}
      <div className="flex gap-1 items-center">
        <Link href={"/profile"}>User</Link>
        <ChevronRight className="w-4 h-4 " />
        <Link href={"/profile"}>Appointments</Link>
      </div>

      {/*  Upcoming Appoinments */}
      <div className="p-4 border-1 border-gray-400 rounded-md">
        <div>
          <h2>Upcoming Appointments</h2>
        </div>
      </div>
    </>
  );
}

export default AppointmentPage;

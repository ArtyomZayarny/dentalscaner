import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';

function AppointmentPage() {
  return (
    <>
      {/* Greeting section */}
      <h1 className="text-3xl font-semibold mb-8">Welcome Beatrice</h1>

      {/* Breadcrumbs section  */}
      <div className="flex gap-1 items-center text-[#616061] font-medium text-xs mb-8">
        <Link href={'/profile'}>User</Link>
        <ChevronRight className="w-4 h-4 " />
        <Link href={'/profile'}>Appointments</Link>
      </div>

      {/*  Upcoming Appoinments */}
      <Section title="Upcoming Appointments">
        <Card />
      </Section>
    </>
  );
}

export default AppointmentPage;

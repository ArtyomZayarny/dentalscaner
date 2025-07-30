'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';

import { DataTable } from './data-table';
import { columns } from './columns';
import { useAppContext } from '../context/appContext';
import Loading from '../components/Loading';

function AppointmentPage() {
  const { user, appointments } = useAppContext();

  if (!user || !appointments) return <Loading />;

  return (
    <>
      {/* Greeting section */}
      <h1 className="text-3xl font-semibold mb-8">{`Welcome ${user.fullName}`}</h1>

      {/* Breadcrumbs section  */}
      <div className="flex gap-1 items-center text-[#616061] font-medium text-xs mb-8">
        <Link href={'/profile'}>User</Link>
        <ChevronRight className="w-4 h-4 " />
        <Link href={'/profile'}>Appointments</Link>
      </div>

      {/*  Upcoming Appointments */}
      <div className="flex flex-col gap-8">
        <Section title="Upcoming Appointments">
          <Card />
        </Section>

        <Section title="All Appointments">
          <DataTable columns={columns} data={appointments} />
        </Section>
      </div>
    </>
  );
}

export default AppointmentPage;

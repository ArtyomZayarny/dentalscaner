import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';
//import Table from '../components/Table';
import { DataTable } from './data-table';
import { Payment, columns } from './columns';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      date: 'June 15, 2025',
      time: '11:00 am',
      clinic: 'Canon Clinics',
      procedure: 'Routine Dental Check',
      status: 'pending',
      actions: 'Complete',
    },
    {
      id: '728ed521',
      amount: 100,
      date: 'June 15, 2025',
      time: '11:00 am',
      clinic: 'Canon Clinics',
      procedure: 'Routine Dental Check',
      status: 'pending',
      actions: 'Complete',
    },
    {
      id: '728ed522',
      amount: 100,
      date: 'June 15, 2025',
      time: '11:00 am',
      clinic: 'Canon Clinics',
      procedure: 'Routine Dental Check',
      status: 'pending',
      actions: 'Complete',
    },
    {
      id: '728ed523',
      amount: 100,
      date: 'June 15, 2025',
      time: '11:00 am',
      clinic: 'Canon Clinics',
      procedure: 'Routine Dental Check',
      status: 'pending',
      actions: 'Complete',
    },
    // ...
  ];
}

async function AppointmentPage() {
  const data = await getData();
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
      <div className="flex flex-col gap-8">
        <Section title="Upcoming Appointments">
          <Card />
        </Section>

        <Section title="All Appointments">
          <DataTable columns={columns} data={data} />
        </Section>
      </div>
    </>
  );
}

export default AppointmentPage;

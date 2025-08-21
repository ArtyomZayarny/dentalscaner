'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Plus } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';
import { Button } from '@/components/ui/button';

import { DataTable } from './data-table';
import { columns } from './columns';
import { useAppContext } from '../context/appContext';
import Loading from '../components/Loading';
import BookingDialog from '../components/BookingDialog';
import { useSearchParams } from 'next/navigation';

function AppointmentPage() {
  const {
    user,
    appointments,
    appointmentsLoading,
    appointmentsError,
    doctors,
    clinics,
    procedures,
  } = useAppContext();
  const searchParams = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get('payment') === 'success') {
      setShowSuccessMessage(true);
      // Remove the query parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchParams]);

  if (!user) return <Loading />;

  if (appointmentsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your appointments...</p>
        </div>
      </div>
    );
  }

  if (appointmentsError) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">❌</div>
          <p className="text-gray-600">Error loading appointments: {appointmentsError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="text-green-600 text-xl mr-3">✅</div>
            <div>
              <h3 className="text-green-800 font-medium">Payment Successful!</h3>
              <p className="text-green-700 text-sm">
                Your appointment has been confirmed and paid.
              </p>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="ml-auto text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Greeting section */}
      <h1 className="text-3xl font-semibold mb-8">{`Welcome ${user.fullName}`}</h1>

      {/* Breadcrumbs section  */}
      <div className="flex gap-1 items-center text-[#616061] font-medium text-xs mb-8">
        <Link href={'/profile'}>User</Link>
        <ChevronRight className="w-4 h-4 " />
        <Link href={'/profile'}>Appointments</Link>
      </div>

      {/*  Upcoming Appointments */}
      {/* <div className="flex flex-col gap-8">
        <Section title="Upcoming Appointments">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Your Appointments</h3>
            <BookingDialog
              userId={user.id}
              doctors={doctors}
              clinics={clinics}
              procedures={procedures}
              timeSlots={[]}
              trigger={
                <Button className="bg-blue-600 hover:bg-blue-700">Book New Appointment</Button>
              }
            />
          </div>
          <Card />
        </Section> */}

      <Section title="All Appointments">
        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">No appointments yet</h3>
            <p className="text-gray-500 mb-6">You haven&apos;t booked any appointments yet.</p>
            <BookingDialog
              userId={user.id}
              doctors={doctors}
              clinics={clinics}
              procedures={procedures}
              timeSlots={[]}
              trigger={
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Book Your First Appointment
                </Button>
              }
            />
          </div>
        ) : (
          <DataTable columns={columns} data={appointments} />
        )}
      </Section>
    </>
  );
}

export default AppointmentPage;

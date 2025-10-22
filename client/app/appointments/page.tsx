'use client';
import React, { useEffect, useState } from 'react';
import Section from '../components/Section';
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
    procedures,
    timeSlots,
    refetchAppointments,
    clearCache,
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

  if (!user) {
    return <Loading message="Loading..." />;
  }

  // Show content immediately, loading state only for appointments
  if (appointmentsLoading) {
    return (
      <div>
        <div className="mb-4 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-black">📅 All Appointments</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Manage your dental appointments and schedule new ones
          </p>
        </div>
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-2 text-primary">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary/20 border-t-primary"></div>
            <span className="text-sm">Loading appointments...</span>
          </div>
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
    <div>
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
              className="ml-auto text-green-600 hover:text-green-800 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/*  Upcoming Appointments */}
      {/* <div className="flex flex-col gap-8">
        <Section title="Upcoming Appointments">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Your Appointments</h3>
            <BookingDialog
              userId={user.id}
              doctors={doctors}
              procedures={procedures}
              timeSlots={timeSlots || []}
              trigger={
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">Book New Appointment</Button>
              }
            />
          </div>
          <Card />
        </Section> */}

      <div className="mb-4 md:mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-black">📅 All Appointments</h1>
            <p className="text-gray-600 text-sm md:text-base">
              Manage your dental appointments and schedule new ones
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={clearCache}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              🧹 Clear Cache
            </Button>
            <Button 
              onClick={refetchAppointments}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              🔄 Refresh
            </Button>
          </div>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📅</div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">No appointments yet</h3>
          <p className="text-gray-500 mb-6">You haven&apos;t booked any appointments yet.</p>
          <BookingDialog
            userId={user.id}
            doctors={doctors}
            procedures={procedures}
            timeSlots={timeSlots || []}
            trigger={
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">
                Book Your First Appointment
              </Button>
            }
          />
        </div>
      ) : (
        <DataTable columns={columns} data={appointments} />
      )}
    </div>
  );
}

export default AppointmentPage;

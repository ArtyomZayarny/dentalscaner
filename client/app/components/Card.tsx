import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAppContext } from '../context/appContext';
import { AppointmentStatus } from '../types/generated';

function Card() {
  const { appointments, doctors, procedures } = useAppContext();

  // Get the first upcoming appointment
  const upcomingAppointment = appointments?.find(
    (apt) => apt.status === AppointmentStatus.Confirmed || apt.status === AppointmentStatus.Pending,
  );

  if (!upcomingAppointment) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No upcoming appointments</p>
      </div>
    );
  }

  const doctor = doctors?.find((d) => d.id === upcomingAppointment.doctorId);
  // Removed clinic lookup - not needed
  const procedure = procedures?.find((p) => p.id === upcomingAppointment.procedureId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          className="object-cover"
          src={
            procedure
              ? (procedure as { image?: string }).image || `/images/procedures/procedure-1.png`
              : '/clinic-preview.png'
          }
          alt={procedure?.name || 'Dental clinic'}
          fill
          sizes="128px"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-lg text-gray-800">Dental Clinic</h4>
          <p className="text-gray-600">{formatDate(upcomingAppointment.date)}</p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Procedure:</span> {procedure?.name || 'Dental Check'}
            </p>
            <span className="font-semibold text-blue-600">
              {formatTime(upcomingAppointment.time)}
            </span>
          </div>
          {doctor && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Doctor:</span> {doctor.name}
            </p>
          )}
        </div>

        <div className="mt-4">
          <Link href={`/appointments/${upcomingAppointment.id}`}>
            <Button className="bg-[#C7DDEB] hover:bg-[#A8C9E0] cursor-pointer text-blue-800 font-semibold">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import { AppointmentStatus } from '../types/generated';

interface AppointmentCardProps {
  appointment: {
    id: string;
    date: string;
    time: string;
    status: string;
    amount: number;
    notes?: string;
    doctorId: string;
    procedureId: string;
  };
  doctorName: string;
  procedureName: string;
}

function AppointmentCard({ appointment, doctorName, procedureName }: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case AppointmentStatus.Completed:
        return 'bg-green-100 text-green-800';
      case AppointmentStatus.Confirmed:
        return 'bg-blue-100 text-blue-800';
      case AppointmentStatus.Pending:
        return 'bg-yellow-100 text-yellow-800';
      case AppointmentStatus.Cancelled:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
    <Link href={`/appointments/${appointment.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
        {/* Title section with more space for 2 lines */}
        <div className="flex items-start justify-between mb-6 min-h-[3rem]">
          <h3 className="font-semibold text-lg text-gray-800 leading-tight flex-1 pr-2">{procedureName}</h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(
              appointment.status,
            )}`}
          >
            {appointment.status}
          </span>
        </div>

        {/* All attributes in a single column */}
        <div className="space-y-3 text-sm text-gray-600 mb-4 flex-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>{formatDate(appointment.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-600 flex-shrink-0" />
            <span>{formatTime(appointment.time)}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <span>{doctorName}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span className="font-semibold text-emerald-600">${appointment.amount}</span>
          </div>
        </div>

        {/* Notes section at the bottom */}
        {appointment.notes && (
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200 mt-auto">
            <p className="text-sm text-amber-800">
              <span className="font-medium">Notes:</span> {appointment.notes}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default AppointmentCard;

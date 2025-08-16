'use client';

import { ColumnDef } from '@tanstack/react-table';
import { IAppointment } from '../types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Calendar, Clock, User, MapPin, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export const columns: ColumnDef<IAppointment>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('date') as string;
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{formattedDate}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'time',
    header: 'Time',
    cell: ({ row }) => {
      const time = row.getValue('time') as string;
      return (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{time}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'procedureId',
    header: 'Procedure',
    cell: ({ row }) => {
      // In a real app, you'd get this from context or props
      const procedureId = row.getValue('procedureId') as string;
      return (
        <div className="font-medium">
          {procedureId === 'proc-1'
            ? 'Routine Dental Check-up'
            : procedureId === 'proc-2'
            ? 'Professional Teeth Cleaning'
            : procedureId === 'proc-3'
            ? 'Cavity Filling'
            : procedureId === 'proc-4'
            ? 'Teeth Whitening'
            : procedureId === 'proc-5'
            ? 'Emergency Tooth Extraction'
            : 'Unknown Procedure'}
        </div>
      );
    },
  },
  {
    accessorKey: 'doctorId',
    header: 'Doctor',
    cell: ({ row }) => {
      const doctorId = row.getValue('doctorId') as string;
      return (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <span>
            {doctorId === 'doc-1'
              ? 'Dr. Sarah Johnson'
              : doctorId === 'doc-2'
              ? 'Dr. Michael Chen'
              : doctorId === 'doc-3'
              ? 'Dr. Emily Rodriguez'
              : 'Unknown Doctor'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'clinicId',
    header: 'Clinic',
    cell: ({ row }) => {
      const clinicId = row.getValue('clinicId') as string;
      return (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>
            {clinicId === 'clinic-1'
              ? 'Bright Smile Dental Clinic'
              : clinicId === 'clinic-2'
              ? 'Family Dental Care'
              : 'Unknown Clinic'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const getStatusColor = (status: string) => {
        switch (status) {
          case 'completed':
            return 'bg-green-100 text-green-800';
          case 'confirmed':
            return 'bg-blue-100 text-blue-800';
          case 'pending':
            return 'bg-yellow-100 text-yellow-800';
          case 'cancelled':
            return 'bg-red-100 text-red-800';
          default:
            return 'bg-gray-100 text-gray-800';
        }
      };

      return <Badge className={getStatusColor(status)}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number;
      return <div className="font-medium">${amount}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/appointments/${appointment.id}`}>
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(appointment.id)}>
              Copy appointment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {appointment.status === 'pending' && (
              <>
                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Cancel appointment</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

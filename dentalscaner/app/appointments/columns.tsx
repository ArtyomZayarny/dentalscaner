'use client';

import { ColumnDef } from '@tanstack/react-table';
import { IAppointment } from '../types';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IAppointment>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'time',
    header: 'Time',
  },
  {
    accessorKey: 'procedure',
    header: 'Procedure',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
  },
];

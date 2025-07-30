'use client';
import { useUser } from '@clerk/nextjs';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { IAppointment, IUser } from '../types';

type AppContextType = {
  user: IUser;
  getData: () => void;
  appointments: IAppointment[];
};

const AppContext = createContext({} as AppContextType);

export function AppContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const { user } = useUser();
  async function getData(): Promise<IAppointment[] | []> {
    // Fetch data from your API here.
    return [
      {
        id: '728ed52f',
        amount: 100,
        date: 'June 15, 2025',
        time: '11:00 am',
        procedure: 'Routine Dental Check',
        status: 'pending',
        actions: 'Complete',
      },
      {
        id: '728ed521',
        amount: 100,
        date: 'June 15, 2025',
        time: '11:00 am',
        procedure: 'Routine Dental Check',
        status: 'pending',
        actions: 'Complete',
      },
      {
        id: '728ed522',
        amount: 100,
        date: 'June 15, 2025',
        time: '11:00 am',
        procedure: 'Routine Dental Check',
        status: 'pending',
        actions: 'Complete',
      },
      {
        id: '728ed523',
        amount: 100,
        date: 'June 15, 2025',
        time: '11:00 am',
        procedure: 'Routine Dental Check',
        status: 'pending',
        actions: 'Complete',
      },
      // ...
    ];
  }

  useEffect(() => {
    if (user) {
      (async () => {
        const data = await getData();
        setAppointments(data);
      })();
    }
  }, [user]);

  const value = {
    user,
    getData,
    appointments,
  } as unknown as AppContextType;

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);

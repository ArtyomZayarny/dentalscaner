'use client';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { IAppointment, IUser, IDoctor, IClinic, IProcedure, ITimeSlot } from '../types';
import { useQuery } from '@apollo/client';
import {
  GET_APPOINTMENTS_BY_USER,
  GET_DOCTORS,
  GET_CLINICS,
  GET_PROCEDURES,
} from '../../lib/graphql-queries';

type AppContextType = {
  user: IUser;
  getData: () => void;
  appointments: IAppointment[];
  appointmentsLoading: boolean;
  appointmentsError: Error | undefined;
  doctors: IDoctor[];
  clinics: IClinic[];
  procedures: IProcedure[];
  timeSlots: ITimeSlot[];
  getAvailableTimeSlots: (doctorId: string, date: string) => ITimeSlot[];
  getDoctorById: (id: string) => IDoctor | undefined;
  getClinicById: (id: string) => IClinic | undefined;
  getProcedureById: (id: string) => IProcedure | undefined;
};

const AppContext = createContext({} as AppContextType);

export function AppContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [timeSlots, setTimeSlots] = useState<ITimeSlot[]>([]);

  const { data: session } = useSession();

  // Convert NextAuth session to our IUser format
  const user: IUser = session?.user
    ? {
        id: session.user.id || '', // Use real user ID from session
        fullName: session.user.name || 'Unknown User',
        email: session.user.email || '',
      }
    : {
        id: '',
        fullName: '',
        email: '',
      };

  // Fetch real data from GraphQL
  const {
    data: appointmentsData,
    loading: appointmentsLoading,
    error: appointmentsError,
  } = useQuery(GET_APPOINTMENTS_BY_USER, {
    variables: { userId: user.id },
    skip: !user.id,
  });

  const { data: doctorsData } = useQuery(GET_DOCTORS);
  const { data: clinicsData } = useQuery(GET_CLINICS);
  const { data: proceduresData } = useQuery(GET_PROCEDURES);

  const appointments: IAppointment[] = appointmentsData?.appointmentsByUserId || [];
  const doctors: IDoctor[] = doctorsData?.doctors || [];
  const clinics: IClinic[] = clinicsData?.clinics || [];
  const procedures: IProcedure[] = proceduresData?.procedures || [];

  async function getData(): Promise<IAppointment[] | []> {
    // This is now handled by GraphQL query
    return appointments;
  }

  const getAvailableTimeSlots = (doctorId: string, date: string): ITimeSlot[] => {
    return timeSlots.filter(
      (slot) => slot.doctorId === doctorId && slot.date === date && slot.isAvailable,
    );
  };

  const getDoctorById = (id: string): IDoctor | undefined => {
    return doctors.find((doctor) => doctor.id === id);
  };

  const getClinicById = (id: string): IClinic | undefined => {
    return clinics.find((clinic) => clinic.id === id);
  };

  const getProcedureById = (id: string): IProcedure | undefined => {
    return procedures.find((procedure) => procedure.id === id);
  };

  useEffect(() => {
    if (session?.user) {
      // Load mock time slots for now (we'll replace with real data later)
      setTimeSlots([]);
    }
  }, [session]);

  const value = {
    user,
    getData,
    appointments,
    appointmentsLoading,
    appointmentsError,
    doctors,
    clinics,
    procedures,
    timeSlots,
    getAvailableTimeSlots,
    getDoctorById,
    getClinicById,
    getProcedureById,
  } as unknown as AppContextType;

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);

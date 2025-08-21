'use client';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { IAppointment, IUser, IDoctor, IClinic, IProcedure, ITimeSlot } from '../types';
import { mockDoctors, mockClinics, mockProcedures, mockTimeSlots } from '../data/mockData';
import { useQuery } from '@apollo/client';
import { GET_APPOINTMENTS_BY_USER } from '../../lib/graphql-queries';

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
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [clinics, setClinics] = useState<IClinic[]>([]);
  const [procedures, setProcedures] = useState<IProcedure[]>([]);
  const [timeSlots, setTimeSlots] = useState<ITimeSlot[]>([]);

  const { data: session } = useSession();

  // Convert NextAuth session to our IUser format
  const user: IUser = session?.user
    ? {
        id: 'f7984366-3ae9-49d8-b133-47474d4d1231', // Use John Doe's UUID for testing
        fullName: session.user.name || 'Unknown User',
        email: session.user.email || '',
      }
    : {
        id: '',
        fullName: '',
        email: '',
      };

  // Fetch real appointments from GraphQL
  const {
    data: appointmentsData,
    loading: appointmentsLoading,
    error: appointmentsError,
  } = useQuery(GET_APPOINTMENTS_BY_USER, {
    variables: { userId: user.id },
    skip: !user.id,
  });

  const appointments: IAppointment[] = appointmentsData?.appointmentsByUserId || [];

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
      // Load mock data for doctors, clinics, procedures, and time slots
      // (We'll replace these with real data later)
      setDoctors(mockDoctors);
      setClinics(mockClinics);
      setProcedures(mockProcedures);
      setTimeSlots(mockTimeSlots);
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

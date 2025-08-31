'use client';
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import {
  GET_APPOINTMENTS_BY_USER,
  GET_DOCTORS,
  GET_CLINICS,
  GET_PROCEDURES,
} from '@/lib/graphql-queries';
import { ITimeSlot } from '../types';
// Import generated types
import { User, Doctor, Clinic, Procedure, Appointment } from '../types/generated';

interface AppContextType {
  user: User;
  getData: () => Promise<Appointment[] | []>;
  appointments: Appointment[];
  appointmentsLoading: boolean;
  appointmentsError: Error | undefined;
  doctors: Doctor[];
  clinics: Clinic[];
  procedures: Procedure[];
  timeSlots: ITimeSlot[];
  getAvailableTimeSlots: (doctorId: string, date: string) => ITimeSlot[];
  getDoctorById: (id: string) => Doctor | undefined;
  getClinicById: (id: string) => Clinic | undefined;
  getProcedureById: (id: string) => Procedure | undefined;
}

const AppContext = createContext({} as AppContextType);

export function AppContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [timeSlots, setTimeSlots] = useState<ITimeSlot[]>([]);

  const { data: session } = useSession();

  // Convert NextAuth session to our User format
  const user: User = session?.user
    ? {
        id: session.user.id || 'f77704e8-ef73-4a74-af76-510469cd3fcb', // Use real user ID from session or fallback to first user
        firstName: session.user.name?.split(' ')[0] || 'Unknown',
        lastName: session.user.name?.split(' ').slice(1).join(' ') || 'User',
        email: session.user.email || '',
        role: 'patient' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    : {
        id: 'f77704e8-ef73-4a74-af76-510469cd3fcb', // Use first user as fallback
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'patient' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
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

  const appointments: Appointment[] = appointmentsData?.appointmentsByUserId || [];
  const doctors: Doctor[] = useMemo(() => doctorsData?.doctors || [], [doctorsData?.doctors]);
  const clinics: Clinic[] = useMemo(() => clinicsData?.clinics || [], [clinicsData?.clinics]);
  const procedures: Procedure[] = useMemo(() => proceduresData?.procedures || [], [proceduresData?.procedures]);

  async function getData(): Promise<Appointment[] | []> {
    // This is now handled by GraphQL query
    return appointments;
  }

  const getAvailableTimeSlots = (doctorId: string, date: string): ITimeSlot[] => {
    return timeSlots.filter(
      (slot) => slot.doctorId === doctorId && slot.date === date && slot.isAvailable,
    );
  };

  const getDoctorById = (id: string): Doctor | undefined => {
    return doctors.find((doctor) => doctor.id === id);
  };

  const getClinicById = (id: string): Clinic | undefined => {
    return clinics.find((clinic) => clinic.id === id);
  };

  const getProcedureById = (id: string): Procedure | undefined => {
    return procedures.find((procedure) => procedure.id === id);
  };

  useEffect(() => {
    if (session?.user && doctors.length > 0 && clinics.length > 0) {
      // Generate mock time slots for the next 30 days
      const mockTimeSlots: ITimeSlot[] = [];
      const today = new Date();

      // Generate slots for the next 30 days
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateString = date.toISOString().split('T')[0];

        // Generate time slots from 9 AM to 5 PM
        const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

        // For each doctor, create time slots
        doctors.forEach((doctor) => {
          timeSlots.forEach((time) => {
            // Make some slots unavailable randomly (but not all)
            const isAvailable = Math.random() > 0.3; // 70% chance of being available

            mockTimeSlots.push({
              id: `slot-${dateString}-${time}-${doctor.id}`,
              doctorId: doctor.id,
              clinicId: clinics[0]?.id || '', // Use first clinic as default
              date: dateString,
              time: time,
              isAvailable: isAvailable,
              duration: 60, // Default 60 minutes
            });
          });
        });
      }

      setTimeSlots(mockTimeSlots);
    }
  }, [session?.user, doctors, clinics]);

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

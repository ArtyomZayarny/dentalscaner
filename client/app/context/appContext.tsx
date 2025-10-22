'use client';
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_APPOINTMENTS_BY_USER, GET_DOCTORS, GET_PROCEDURES } from '@/lib/graphql-queries';
// Import generated types
import { User, Doctor, Procedure, Appointment } from '../types/generated';

// Define TimeSlot interface locally since it's not in generated types
interface TimeSlot {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  isAvailable: boolean;
  duration: number;
}

interface AppContextType {
  user: User;
  getData: () => Promise<Appointment[] | []>;
  appointments: Appointment[];
  appointmentsLoading: boolean;
  appointmentsError: Error | undefined;
  refetchAppointments: () => void;
  clearCache: () => void;
  doctors: Doctor[];
  doctorsLoading: boolean;
  doctorsError: Error | undefined;
  // Removed clinics - not needed
  procedures: Procedure[];
  proceduresLoading: boolean;
  proceduresError: Error | undefined;
  timeSlots: TimeSlot[];
  getAvailableTimeSlots: (doctorId: string, date: string) => TimeSlot[];
  getDoctorById: (id: string) => Doctor | undefined;
  // Removed getClinicById - not needed
  getProcedureById: (id: string) => Procedure | undefined;
}

const AppContext = createContext({} as AppContextType);

export function AppContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const apolloClient = useApolloClient();

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
    refetch: refetchAppointments,
  } = useQuery(GET_APPOINTMENTS_BY_USER, {
    variables: { userId: user.id },
    skip: !user.id,
    onCompleted: (data) => {
      // Appointments query completed
    },
    onError: (error) => {
      // Appointments query error
    },
  });

  const { data: doctorsData, loading: doctorsLoading, error: doctorsError } = useQuery(GET_DOCTORS);

  // Removed clinics - not needed

  const {
    data: proceduresData,
    loading: proceduresLoading,
    error: proceduresError,
  } = useQuery(GET_PROCEDURES);

  const appointments: Appointment[] = appointmentsData?.appointmentsByUserId || [];
  const doctors: Doctor[] = useMemo(() => doctorsData?.doctors || [], [doctorsData?.doctors]);
  // Removed clinics - not needed
  const procedures: Procedure[] = useMemo(
    () => proceduresData?.procedures || [],
    [proceduresData?.procedures],
  );

  async function getData(): Promise<Appointment[] | []> {
    // This is now handled by GraphQL query
    return appointments;
  }

  const getAvailableTimeSlots = (doctorId: string, date: string): TimeSlot[] => {
    return timeSlots.filter(
      (slot) => slot.doctorId === doctorId && slot.date === date && slot.isAvailable,
    );
  };

  const getDoctorById = (id: string): Doctor | undefined => {
    return doctors.find((doctor) => doctor.id === id);
  };

  // Removed getClinicById - not needed

  const getProcedureById = (id: string): Procedure | undefined => {
    return procedures.find((procedure) => procedure.id === id);
  };

  const clearCache = () => {
    apolloClient.clearStore();
  };

  useEffect(() => {
    if (session?.user && doctors.length > 0) {
      // Generate mock time slots for the next 30 days
      const mockTimeSlots: TimeSlot[] = [];
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
              // Removed clinicId - not needed
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
  }, [session?.user, doctors]);

  const value = {
    user,
    getData,
    appointments,
    appointmentsLoading,
    appointmentsError,
    refetchAppointments,
    clearCache,
    doctors,
    doctorsLoading,
    doctorsError,
    // Removed clinics - not needed
    procedures,
    proceduresLoading,
    proceduresError,
    timeSlots,
    getAvailableTimeSlots,
    getDoctorById,
    // Removed getClinicById - not needed
    getProcedureById,
  } as unknown as AppContextType;


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

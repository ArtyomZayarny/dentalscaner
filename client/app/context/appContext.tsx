'use client';
import { useUser } from '@clerk/nextjs';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { IAppointment, IUser, IDoctor, IClinic, IProcedure, ITimeSlot } from '../types';
import {
  mockAppointments,
  mockDoctors,
  mockClinics,
  mockProcedures,
  mockTimeSlots,
} from '../data/mockData';

type AppContextType = {
  user: IUser;
  getData: () => void;
  appointments: IAppointment[];
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
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [clinics, setClinics] = useState<IClinic[]>([]);
  const [procedures, setProcedures] = useState<IProcedure[]>([]);
  const [timeSlots, setTimeSlots] = useState<ITimeSlot[]>([]);

  const { user } = useUser();

  async function getData(): Promise<IAppointment[] | []> {
    // In a real app, this would fetch from your API
    return mockAppointments;
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
    if (user) {
      // Load mock data
      setDoctors(mockDoctors);
      setClinics(mockClinics);
      setProcedures(mockProcedures);
      setTimeSlots(mockTimeSlots);

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

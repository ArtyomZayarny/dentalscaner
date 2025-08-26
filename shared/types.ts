// Shared type definitions for frontend and backend
// This ensures consistency across the entire application

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  address?: string;
  role: 'patient' | 'doctor' | 'admin';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDoctor {
  id: string;
  name: string;
  specialization?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClinic {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProcedure {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITimeSlot {
  id: string;
  doctorId: string;
  clinicId: string;
  date: string;
  time: string;
  isAvailable: boolean;
  duration: number;
}

export interface IAppointment {
  id: string;
  userId: string;
  doctorId: string;
  clinicId: string;
  procedureId: string;
  date: string;
  time: string;
  duration: number;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  stripePaymentIntentId?: string;
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Validation schemas using Zod
export const UserSchema = {
  email: (email: string) => email.includes('@'),
  firstName: (name: string) => name.length > 0,
  lastName: (name: string) => name.length > 0,
};

export const ProcedureSchema = {
  name: (name: string) => name.length > 0,
  price: (price: number) => price > 0,
  duration: (duration: number) => duration > 0,
};

export const AppointmentSchema = {
  date: (date: string) => new Date(date) > new Date(),
  time: (time: string) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time),
};

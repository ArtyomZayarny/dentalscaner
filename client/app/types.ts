export interface IUser {
  email: string;
  fullName: string;
  id: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
}

export interface IDoctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  image?: string;
  bio?: string;
  availableDays: string[];
  workingHours: {
    start: string;
    end: string;
  };
}

export interface IClinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  image?: string;
  rating: number;
  workingHours: {
    start: string;
    end: string;
  };
  doctors: string[]; // doctor IDs
}

export interface IProcedure {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: {
    min: number;
    max: number;
    currency: string;
  };
  category: 'checkup' | 'treatment' | 'cosmetic' | 'emergency';
  image?: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface IBookingRequest {
  userId: string;
  doctorId: string;
  clinicId: string;
  procedureId: string;
  date: string;
  time: string;
  notes?: string;
}

export enum BookingType {
  Appointment = 'appointment',
  Procedure = 'procedure',
}

export interface IFilterOptions {
  date?: string;
  doctorId?: string;
  clinicId?: string;
  procedureId?: string;
  status?: string;
}

export interface ISearchParams {
  query?: string;
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

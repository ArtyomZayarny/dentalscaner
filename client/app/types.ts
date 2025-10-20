// Frontend-specific types
export interface IFilterOptions {
  date?: string;
  doctorId?: string;
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

export enum BookingType {
  Appointment = 'appointment',
  Procedure = 'procedure',
}

export interface IBookingRequest {
  userId: string;
  doctorId: string;
  procedureId: string;
  date: string;
  time: string;
  notes?: string;
}

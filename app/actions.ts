'use server';

import { BookingType } from './types';

export async function createBooking(userId: string, bookingType: BookingType, formData: FormData) {
  const rawFormData = {
    userId,
    date: formData.get('date'),
    time: formData.get('time'),
    procedure: formData.get('procedure'),
    bookingType,
  };
  //request create appointment endpointgit
}

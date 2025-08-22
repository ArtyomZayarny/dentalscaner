'use client';
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Calendar, Clock, User } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { CREATE_APPOINTMENT } from '@/lib/graphql-queries';
import { IDoctor, IClinic, IProcedure, ITimeSlot } from '../types';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

// Add Stripe to window type
declare global {
  interface Window {
    Stripe: (publishableKey: string) => {
      redirectToCheckout: (options: {
        sessionId: string;
      }) => Promise<{ error?: { message: string } }>;
    };
  }
}

interface BookingDialogProps {
  userId: string;
  doctors: IDoctor[];
  clinics: IClinic[];
  procedures: IProcedure[];
  timeSlots: ITimeSlot[];
  trigger?: React.ReactNode;
  triggerClassName?: string;
  title?: string;
  description?: string;
}

export default function BookingDialog({
  userId,
  doctors,
  clinics,
  procedures,
  timeSlots,
  trigger,
  triggerClassName = 'w-full justify-start',
  title = 'Book New Appointment',
  description = 'Schedule your next dental visit',
}: BookingDialogProps) {
  const [step, setStep] = useState<'doctor' | 'date' | 'time' | 'details'>('doctor');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedProcedure, setSelectedProcedure] = useState<string>('');
  const [notes, setNotes] = useState('');

  const [createAppointment, { loading: creatingAppointment }] = useMutation(CREATE_APPOINTMENT);

  // Get selected procedure details
  const selectedProcedureDetails = useMemo(() => {
    return procedures.find((proc) => proc.id === selectedProcedure);
  }, [selectedProcedure, procedures]);

  // Get available dates for selected doctor
  const availableDates = useMemo(() => {
    if (!selectedDoctor || !timeSlots) return [];

    const doctorTimeSlots = timeSlots.filter((slot) => slot.doctorId === selectedDoctor);
    const dates = [...new Set(doctorTimeSlots.map((slot) => slot.date))];

    const filteredDates = dates
      .filter((date) => {
        const dateObj = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return dateObj >= today;
      })
      .sort();

    return filteredDates;
  }, [selectedDoctor, timeSlots]);

  // Get available time slots for selected doctor and date
  const availableTimeSlots = useMemo(() => {
    if (!selectedDoctor || !selectedDate || !timeSlots) return [];

    return timeSlots
      .filter(
        (slot) =>
          slot.doctorId === selectedDoctor && slot.date === selectedDate && slot.isAvailable,
      )
      .map((slot) => ({
        id: slot.id,
        time: slot.time,
        isAvailable: slot.isAvailable,
      }))
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [selectedDoctor, selectedDate, timeSlots]);

  // Get doctor's primary clinic
  const doctorPrimaryClinic = useMemo(() => {
    if (!selectedDoctor || !clinics) return null;
    return clinics.find((clinic) => clinic.doctors.includes(selectedDoctor));
  }, [selectedDoctor, clinics]);

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setSelectedDate('');
    setSelectedTime('');
    setStep('date');
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
    setStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('details');
  };

  const handleBack = () => {
    switch (step) {
      case 'date':
        setStep('doctor');
        setSelectedDoctor('');
        break;
      case 'time':
        setStep('date');
        setSelectedDate('');
        break;
      case 'details':
        setStep('time');
        setSelectedTime('');
        break;
    }
  };

  const resetForm = () => {
    setStep('doctor');
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedProcedure('');
    setNotes('');
  };

  // const router = useRouter(); // Commented out as not currently used

  const getSelectedDoctor = () => doctors.find((d) => d.id === selectedDoctor);

  const handleConfirmBooking = async () => {
    if (!selectedProcedureDetails) {
      alert('Please select a procedure first.');
      return;
    }

    try {
      const { data } = await createAppointment({
        variables: {
          userId,
          doctorId: selectedDoctor,
          clinicId: doctorPrimaryClinic?.id || '',
          procedureId: selectedProcedure,
          date: selectedDate,
          time: selectedTime,
          duration: selectedProcedureDetails.duration,
          amount: selectedProcedureDetails.price.min,
          notes: notes || undefined,
        },
      });

      const appointmentId = data.createAppointment.id;

      // Create checkout session and redirect to Stripe's hosted payment page
      let baseUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL?.replace('/graphql', '');
      if (!baseUrl) {
        if (typeof window !== 'undefined') {
          const protocol = window.location.protocol;
          const host = window.location.host;
          baseUrl = `${protocol}//${host.replace('dentalscaner-fe', 'dentalscaner-three')}`;
        } else {
          baseUrl = 'http://localhost:3001';
        }
      }

      const paymentResponse = await fetch(`${baseUrl}/payment/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appointmentId }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Failed to create checkout session');
      }

      const paymentData = await paymentResponse.json();

      // Redirect to Stripe's hosted payment page
      const stripe = window.Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      const { error } = await stripe.redirectToCheckout({
        sessionId: paymentData.sessionId,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Failed to create appointment:', error);
      alert('Failed to create appointment. Please try again.');
    }
  };

  const renderDoctorSelection = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Select a Doctor</h3>
      <div className="grid gap-3">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedDoctor === doctor.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleDoctorSelect(doctor.id)}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">👨‍⚕️</div>
              <div className="flex-1">
                <h4 className="font-medium">{doctor.name}</h4>
                <p className="text-sm text-gray-600">{doctor.specialization}</p>
                <p className="text-sm text-gray-500">{doctor.experience} years experience</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm font-medium">{doctor.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDateSelection = () => {
    // Convert selected date to Date object for the calendar
    const selectedDateObject = selectedDate ? new Date(selectedDate) : undefined;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            ←
          </button>
          <h3 className="font-semibold text-lg">Select Date</h3>
        </div>

        <CalendarComponent
          mode="single"
          selected={selectedDateObject}
          onSelect={(date) => {
            if (date) {
              const dateStr = date.toISOString().split('T')[0];
              if (availableDates.includes(dateStr)) {
                handleDateSelect(dateStr);
              }
            }
          }}
          disabled={(date) => {
            const dateStr = date.toISOString().split('T')[0];
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today || !availableDates.includes(dateStr);
          }}
          className="rounded-md border w-full"
        />

        {availableDates.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No available dates for this doctor</p>
          </div>
        )}
      </div>
    );
  };

  const renderTimeSelection = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          ←
        </button>
        <h3 className="font-semibold text-lg">Select Time</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {availableTimeSlots.map((slot) => (
          <div
            key={slot.id}
            className={`p-3 border rounded-lg cursor-pointer transition-colors text-center ${
              selectedTime === slot.time
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleTimeSelect(slot.time)}
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{slot.time}</span>
            </div>
          </div>
        ))}
      </div>

      {availableTimeSlots.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>No available time slots for this date</p>
        </div>
      )}
    </div>
  );

  const renderDetailsForm = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          ←
        </button>
        <h3 className="font-semibold text-lg">Appointment Details</h3>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Doctor: <span className="font-medium">{getSelectedDoctor()?.name}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Date: <span className="font-medium">{selectedDate}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Time: <span className="font-medium">{selectedTime}</span>
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <select
          name="procedureId"
          value={selectedProcedure}
          onChange={(e) => setSelectedProcedure(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Procedure</option>
          {procedures.map((procedure) => (
            <option key={procedure.id} value={procedure.id}>
              {procedure.name}
            </option>
          ))}
        </select>

        {selectedProcedureDetails && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Price:</span>
              <span className="text-lg font-bold text-blue-600">
                ${selectedProcedureDetails.price.min}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm text-gray-600">Duration:</span>
              <span className="text-sm font-medium">
                {selectedProcedureDetails.duration} minutes
              </span>
            </div>
          </div>
        )}
      </div>

      <textarea
        name="notes"
        placeholder="Additional notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full border rounded px-3 py-2 resize-none"
        rows={3}
      />

      <input type="hidden" name="doctorId" value={selectedDoctor} />
      <input type="hidden" name="date" value={selectedDate} />
      <input type="hidden" name="time" value={selectedTime} />
      <input type="hidden" name="clinicId" value={doctorPrimaryClinic?.id || ''} />
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 'doctor':
        return renderDoctorSelection();
      case 'date':
        return renderDateSelection();
      case 'time':
        return renderTimeSelection();
      case 'details':
        return renderDetailsForm();
      default:
        return renderDoctorSelection();
    }
  };

  return (
    <Dialog onOpenChange={(open) => !open && resetForm()}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className={triggerClassName}>
            <Plus className="mr-2 w-4 h-4" />
            Book New Appointment
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirmBooking();
          }}
          className="mt-4"
        >
          {renderCurrentStep()}

          {step === 'details' && (
            <DialogFooter className="mt-6">
              <Button type="submit" disabled={creatingAppointment}>
                {creatingAppointment ? 'Creating Appointment...' : 'Confirm Booking'}
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

'use client';
import React, { useState } from 'react';
import { useAppContext } from './context/appContext';
import Loading from './components/Loading';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createInvoice } from './actions';

function OverviewPage() {
  const { user, appointments } = useAppContext();
  const [form, setForm] = useState({
    date: '',
    time: '',
    procedure: '',
  });

  if (!user || !appointments) return <Loading />;

  const nextAppointment = {
    date: 'June 15',
    time: '10:00',
    clinic: 'Dash Dental Clinic',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBookingWithUserID = createInvoice.bind(null, user.id);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">👋 Hello, {user.fullName}!</h1>
      <section className="bg-white rounded-lg shadow p-6 mb-6 max-w-xl">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">🦷</span>
            <span className="font-semibold">Next appointment:</span>
          </div>
          <div className="p-4 text-gray-700 mb-2 bg-blue-100 rounded">
            You are scheduled for: {nextAppointment.date}, {nextAppointment.time},{' '}
            {nextAppointment.clinic}
          </div>
          <div className="flex gap-4 mt-2">
            <button className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded flex items-center gap-2 font-medium cursor-pointer hover:bg-yellow-200">
              <span role="img" aria-label="details">
                🔔
              </span>
              View details
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 font-medium cursor-pointer hover:bg-blue-700">
                  <span role="img" aria-label="calendar">
                    📅
                  </span>
                  Book an appointment
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book an Appointment</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to book your appointment.
                  </DialogDescription>
                </DialogHeader>
                <form action={submitBookingWithUserID} className="flex flex-col gap-4 mt-4">
                  <Input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleInputChange}
                    required
                  />
                  <select
                    name="procedure"
                    value={form.procedure}
                    onChange={handleInputChange}
                    required
                    className="border rounded px-3 py-2"
                  >
                    <option value="">Select procedure</option>
                    <option value="Routine Dental Check">Routine Dental Check</option>
                  </select>
                  <DialogFooter>
                    <Button type="submit">Book</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* Optional content below */}
        <div className="mt-6">
          <div className="flex items-center mb-2">
            <span className="mr-2">🗂️</span>
            <span className="text-gray-700">
              Status of recent appointments:
              <span className="font-medium">awaiting confirmation / completed</span>
            </span>
          </div>
          <div className="flex items-center mt-2">
            <span className="mr-2">🎯</span>
            <span className="text-gray-700">
              It&apos;s been more than 6 months since your last visit — time for a check-up!
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default OverviewPage;

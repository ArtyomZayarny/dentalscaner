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
import { createBooking } from './actions';
import { BookingType } from './types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Plus, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

function OverviewPage() {
  const { user, appointments, doctors, clinics, procedures } = useAppContext();
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    doctorId: '',
    clinicId: '',
    procedureId: '',
    notes: '',
  });

  if (!user || !appointments) return <Loading />;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const submitBookingWithUserID = createBooking.bind(null, user.id, BookingType.Appointment);

  // Calculate statistics
  const totalAppointments = appointments.length;
  const upcomingAppointments = appointments
    .filter((apt) => apt.status === 'confirmed' || apt.status === 'pending')
    .slice(0, 3);
  const completedAppointments = appointments.filter((apt) => apt.status === 'completed').length;
  const pendingAppointments = appointments.filter((apt) => apt.status === 'pending').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    return doctor?.name || 'Unknown Doctor';
  };

  const getClinicName = (clinicId: string) => {
    const clinic = clinics.find((c) => c.id === clinicId);
    return clinic?.name || 'Unknown Clinic';
  };

  const getProcedureName = (procedureId: string) => {
    const procedure = procedures.find((p) => p.id === procedureId);
    return procedure?.name || 'Unknown Procedure';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">👋 Hello, {user.fullName}!</h1>
        <p className="text-gray-600">Welcome back to your dental care dashboard</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Appointments</p>
              <p className="text-2xl font-bold">{totalAppointments}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedAppointments}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingAppointments}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Available Doctors</p>
              <p className="text-2xl font-bold text-purple-600">{doctors.length}</p>
            </div>
            <User className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full justify-start">
                  <Plus className="mr-2 w-4 h-4" />
                  Book New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Book New Appointment</DialogTitle>
                  <DialogDescription>Schedule your next dental visit</DialogDescription>
                </DialogHeader>
                <form action={submitBookingWithUserID} className="flex flex-col gap-4 mt-4">
                  <Input
                    type="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <Input
                    type="time"
                    name="time"
                    value={bookingForm.time}
                    onChange={handleInputChange}
                    required
                  />
                  <select
                    name="procedureId"
                    value={bookingForm.procedureId}
                    onChange={handleInputChange}
                    required
                    className="border rounded px-3 py-2"
                  >
                    <option value="">Select Procedure</option>
                    {procedures.map((procedure) => (
                      <option key={procedure.id} value={procedure.id}>
                        {procedure.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="doctorId"
                    value={bookingForm.doctorId}
                    onChange={handleInputChange}
                    required
                    className="border rounded px-3 py-2"
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </select>
                  <select
                    name="clinicId"
                    value={bookingForm.clinicId}
                    onChange={handleInputChange}
                    required
                    className="border rounded px-3 py-2"
                  >
                    <option value="">Select Clinic</option>
                    {clinics.map((clinic) => (
                      <option key={clinic.id} value={clinic.id}>
                        {clinic.name}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="notes"
                    placeholder="Additional notes (optional)"
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="border rounded px-3 py-2 resize-none"
                    rows={3}
                  />
                  <DialogFooter>
                    <Button type="submit">Book Appointment</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Link href="/procedure">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2 w-4 h-4" />
                Browse Procedures
              </Button>
            </Link>

            <Link href="/doctors">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 w-4 h-4" />
                View Doctors
              </Button>
            </Link>

            <Link href="/appointments">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 w-4 h-4" />
                Manage Appointments
              </Button>
            </Link>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <Link key={appointment.id} href={`/appointments/${appointment.id}`}>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{getProcedureName(appointment.procedureId)}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          appointment.status,
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{getDoctorName(appointment.doctorId)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{getClinicName(appointment.clinicId)}</span>
                      </div>
                    </div>
                    {appointment.notes && (
                      <p className="text-sm text-gray-500 mt-2">Notes: {appointment.notes}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No upcoming appointments</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 w-4 h-4" />
                    Book Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Book New Appointment</DialogTitle>
                    <DialogDescription>Schedule your next dental visit</DialogDescription>
                  </DialogHeader>
                  <form action={submitBookingWithUserID} className="flex flex-col gap-4 mt-4">
                    <Input
                      type="date"
                      name="date"
                      value={bookingForm.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <Input
                      type="time"
                      name="time"
                      value={bookingForm.time}
                      onChange={handleInputChange}
                      required
                    />
                    <select
                      name="procedureId"
                      value={bookingForm.procedureId}
                      onChange={handleInputChange}
                      required
                      className="border rounded px-3 py-2"
                    >
                      <option value="">Select Procedure</option>
                      {procedures.map((procedure) => (
                        <option key={procedure.id} value={procedure.id}>
                          {procedure.name}
                        </option>
                      ))}
                    </select>
                    <select
                      name="doctorId"
                      value={bookingForm.doctorId}
                      onChange={handleInputChange}
                      required
                      className="border rounded px-3 py-2"
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialization}
                        </option>
                      ))}
                    </select>
                    <select
                      name="clinicId"
                      value={bookingForm.clinicId}
                      onChange={handleInputChange}
                      required
                      className="border rounded px-3 py-2"
                    >
                      <option value="">Select Clinic</option>
                      {clinics.map((clinic) => (
                        <option key={clinic.id} value={clinic.id}>
                          {clinic.name}
                        </option>
                      ))}
                    </select>
                    <textarea
                      name="notes"
                      placeholder="Additional notes (optional)"
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      className="border rounded px-3 py-2 resize-none"
                      rows={3}
                    />
                    <DialogFooter>
                      <Button type="submit">Book Appointment</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;

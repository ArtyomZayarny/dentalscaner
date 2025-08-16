'use client';
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
import { Input } from '@/components/ui/input';
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/appContext';
import { createBooking } from '../actions';
import Loading from '../components/Loading';
import { BookingType } from '../types';
import { Search, Clock, DollarSign } from 'lucide-react';

function ProcedurePage() {
  const { user, appointments, procedures, doctors, clinics } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');


  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    doctorId: '',
    clinicId: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  // Filter procedures based on search and category
  const filteredProcedures = useMemo(() => {
    return procedures.filter((procedure) => {
      const matchesSearch =
        procedure.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        procedure.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || procedure.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [procedures, searchQuery, selectedCategory]);

  if (!user || !appointments) return <Loading />;

  const categories = [
    { id: 'all', name: 'All Procedures' },
    { id: 'checkup', name: 'Check-ups' },
    { id: 'treatment', name: 'Treatments' },
    { id: 'cosmetic', name: 'Cosmetic' },
    { id: 'emergency', name: 'Emergency' },
  ];



  const submitBookingWithUserID = createBooking.bind(null, user.id, BookingType.Procedure);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🦷 Dental Procedures</h1>
        <p className="text-gray-600">
          Explore our comprehensive range of dental services and book your appointment
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search procedures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Procedures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProcedures.map((procedure) => (
          <div
            key={procedure.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              <div className="text-6xl">🦷</div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{procedure.name}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    procedure.category === 'emergency'
                      ? 'bg-red-100 text-red-800'
                      : procedure.category === 'cosmetic'
                      ? 'bg-purple-100 text-purple-800'
                      : procedure.category === 'treatment'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {procedure.category}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{procedure.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {procedure.duration}min
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />${procedure.price.min}-${procedure.price.max}
                  </div>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    Book Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Book {procedure.name}</DialogTitle>
                    <DialogDescription>
                      Select your preferred date, time, doctor, and clinic.
                    </DialogDescription>
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
                      <Button type="submit">Confirm Booking</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>

      {filteredProcedures.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No procedures found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

export default ProcedurePage;

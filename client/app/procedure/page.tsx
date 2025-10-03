'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/appContext';
import Loading from '../components/Loading';
import { Search, Clock, DollarSign } from 'lucide-react';
import BookingDialog from '../components/BookingDialog';
import List from '../components/List';

function ProcedurePage() {
  const { user, appointments, procedures, proceduresLoading, doctors, clinics, timeSlots } =
    useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter procedures based on search and category
  const filteredProcedures = useMemo(() => {
    if (!procedures) return [];

    return procedures.filter((procedure) => {
      const matchesSearch =
        procedure.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (procedure.description || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all';
      return matchesSearch && matchesCategory;
    });
  }, [procedures, searchQuery, selectedCategory]);

  // Show loading while procedures are being fetched
  if (proceduresLoading) {
    return <Loading />;
  }

  if (!user || !appointments || !doctors || !clinics || !timeSlots) return <Loading />;

  const categories = [
    { id: 'all', name: 'All Procedures' },
    { id: 'checkup', name: 'Check-ups' },
    { id: 'treatment', name: 'Treatments' },
    { id: 'cosmetic', name: 'Cosmetic' },
    { id: 'emergency', name: 'Emergency' },
  ];

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
      <List
        data={filteredProcedures}
        renderItem={(procedure) => (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              <div className="text-6xl">🦷</div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{procedure.name}</h3>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  General
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 flex-grow">{procedure.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {procedure.duration}min
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />${procedure.price}
                  </div>
                </div>
              </div>

              <BookingDialog
                userId={user.id}
                doctors={doctors}
                clinics={clinics}
                procedures={procedures}
                timeSlots={timeSlots}
                trigger={<Button className="w-full">Book Appointment</Button>}
                title={`Book ${procedure.name}`}
                description="Select your preferred date, time, doctor, and clinic."
              />
            </div>
          </div>
        )}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        emptyMessage="No procedures found"
        emptyIcon={<div className="text-6xl mb-4">🔍</div>}
      />
    </div>
  );
}

export default ProcedurePage;

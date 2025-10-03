'use client';
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/appContext';
import Loading from '../components/Loading';
import { Doctor } from '../types/generated';
import { Search, Star, MapPin, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import List from '../components/List';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function DoctorsPage() {
  const { 
    user, 
    appointments, 
    doctors, 
    doctorsLoading, 
    clinics 
  } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');

  // Get unique specializations
  const specializations = useMemo(() => {
    if (!doctors) return ['all'];

    const specs = doctors.map((doctor) => doctor.specialization || 'General').filter(Boolean);
    return ['all', ...Array.from(new Set(specs))];
  }, [doctors]);

  // Filter doctors based on search and specialization
  const filteredDoctors = useMemo(() => {
    if (!doctors) return [];

    return doctors.filter((doctor) => {
      const doctorSpecialization = doctor.specialization || 'General';
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctorSpecialization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialization =
        selectedSpecialization === 'all' || doctorSpecialization === selectedSpecialization;
      return matchesSearch && matchesSpecialization;
    });
  }, [doctors, searchQuery, selectedSpecialization]);

  // Show loading while doctors are being fetched
  if (doctorsLoading) {
    return <Loading />;
  }

  if (!user || !appointments) return <Loading />;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">👨‍⚕️ Our Doctors</h1>
        <p className="text-gray-600">
          Meet our experienced dental professionals committed to your oral health
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search doctors by name or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {specializations.map((spec) => (
              <Button
                key={spec}
                variant={selectedSpecialization === spec ? 'default' : 'outline'}
                onClick={() => setSelectedSpecialization(spec)}
                className="whitespace-nowrap"
              >
                {spec === 'all' ? 'All Specializations' : spec}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <List
        data={filteredDoctors}
        renderItem={(doctor) => (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              <div className="text-6xl">👨‍⚕️</div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{doctor.name}</h3>
              </div>

              <p className="text-blue-600 font-medium mb-2">
                {doctor.specialization || 'General Dentistry'}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Award className="w-4 h-4" />
                  <span>Professional Doctor</span>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">View Details</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <div className="text-3xl">👨‍⚕️</div>
                      {doctor.name}
                    </DialogTitle>
                    <DialogDescription>
                      {doctor.specialization || 'General Dentistry'}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">About</h4>
                      <p className="text-gray-600">
                        Professional dental care provider with expertise in{' '}
                        {doctor.specialization || 'general dentistry'}.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Available at Clinics</h4>
                      <div className="space-y-2">
                        {clinics.map((clinic) => (
                          <div key={clinic.id} className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{clinic.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        emptyMessage="No doctors found"
        emptyIcon={<div className="text-6xl mb-4">🔍</div>}
      />
    </div>
  );
}

export default DoctorsPage;

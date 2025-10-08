'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useAppContext } from '../context/appContext';
import Loading from '../components/Loading';
// Removed unused Doctor import
import { Search, Award, Filter, X } from 'lucide-react';
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
  const { user, appointments, doctors, doctorsLoading } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

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
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-4 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">👨‍⚕️ Our Doctors</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Meet our experienced dental professionals committed to your oral health
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-6 md:mb-8">
        {/* Search Bar with Filter Button */}
        <div className="relative mb-4 md:mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search doctors by name or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg"
          />
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
          </button>
        </div>

        {/* Filter Buttons - Hidden on mobile by default, shown when toggled */}
        <div className={`space-y-3 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="flex flex-wrap gap-2 md:gap-3">
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
        renderItem={(doctor, index) => (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
              <Image
                src={
                  doctor.avatar?.startsWith('http')
                    ? `/images/doctors/doctor-${index + 1}.png`
                    : doctor.avatar || `/images/doctors/doctor-1.png`
                }
                alt={doctor.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
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
                    <DialogTitle className="flex items-center gap-3">
                      <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gradient-to-b from-blue-50 to-white">
                        <Image
                          src={
                            doctor.avatar?.startsWith('http')
                              ? `/images/doctors/doctor-1.png`
                              : doctor.avatar || `/images/doctors/doctor-1.png`
                          }
                          alt={doctor.name}
                          fill
                          className="object-cover object-top"
                          sizes="48px"
                        />
                      </div>
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

                    {/* Removed clinics section - not needed */}
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

'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/appContext';
import Loading from '../components/Loading';
import {
  Search,
  Clock,
  DollarSign,
  Stethoscope,
  Heart,
  Sparkles,
  AlertTriangle,
  Activity,
  Filter,
  X,
} from 'lucide-react';
import BookingDialog from '../components/BookingDialog';
import List from '../components/List';

function ProcedurePage() {
  const { user, appointments, procedures, proceduresLoading, doctors, timeSlots } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

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
    return <Loading message="Loading procedures..." />;
  }

  if (!user || !appointments || !doctors || !timeSlots) {
    return <Loading message="Loading..." />;
  }

  const categories = [
    {
      id: 'all',
      name: 'All Procedures',
      icon: Activity,
      color: 'bg-primary text-primary-foreground hover:bg-primary/90',
      activeColor: 'bg-primary text-primary-foreground shadow-lg',
    },
    {
      id: 'checkup',
      name: 'Check-ups',
      icon: Stethoscope,
      color: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200',
      activeColor: 'bg-green-500 text-white shadow-lg shadow-green-200',
    },
    {
      id: 'treatment',
      name: 'Treatments',
      icon: Heart,
      color: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200',
      activeColor: 'bg-red-500 text-white shadow-lg shadow-red-200',
    },
    {
      id: 'cosmetic',
      name: 'Cosmetic',
      icon: Sparkles,
      color: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200',
      activeColor: 'bg-purple-500 text-white shadow-lg shadow-purple-200',
    },
    {
      id: 'emergency',
      name: 'Emergency',
      icon: AlertTriangle,
      color: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200',
      activeColor: 'bg-orange-500 text-white shadow-lg shadow-orange-200',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-black">🦷 Dental Procedures</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Explore our comprehensive range of dental services and book your appointment
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
        {/* Search Bar with Filter Button */}
        <div className="relative mb-4 md:mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search procedures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 text-base border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg"
          />
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
          </button>
        </div>

        {/* Filter Buttons - Hidden on mobile by default, shown when toggled */}
        <div className={`space-y-3 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map((category) => {
              const isActive = selectedCategory === category.id;

              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap bg-primary/10 hover:bg-primary/20 text-primary cursor-pointer border-0 ${
                    isActive ? 'ring-2 ring-offset-2 ring-primary/30' : ''
                  }`}
                >
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Procedures Grid */}
      <List
        data={filteredProcedures}
        renderItem={(procedure, index) => (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full cursor-pointer border-0">
            <div className="h-48 relative overflow-hidden">
              <Image
                src={
                  (procedure as { image?: string }).image ||
                  `/images/procedures/procedure-${index + 1}.png`
                }
                alt={procedure.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
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
                    <DollarSign className="w-4 h-4" />
                    {procedure.price}
                  </div>
                </div>
              </div>

              <BookingDialog
                userId={user.id}
                doctors={doctors}
                procedures={procedures}
                timeSlots={timeSlots}
                trigger={
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">
                    Book Appointment
                  </Button>
                }
                title={`Book ${procedure.name}`}
                description="Select your preferred date, time, and doctor."
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

'use client';
import React from 'react';
import { useAppContext } from '../context/appContext';
import Loading from '../components/Loading';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import BookingDialog from '../components/BookingDialog';
import StatCard from '../components/StatCard';
import List from '../components/List';
import { AppointmentStatus } from '../types/generated';

function OverviewPage() {
  const {
    user,
    appointments,
    appointmentsLoading,
    appointmentsError,
    doctors,
    procedures,
    timeSlots,
  } = useAppContext();

  if (!user) return <Loading />;

  if (appointmentsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (appointmentsError) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">❌</div>
          <p className="text-gray-600">Error loading dashboard: {appointmentsError.message}</p>
        </div>
      </div>
    );
  }

  if (!doctors || !procedures || !timeSlots) return <Loading />;

  // Calculate statistics
  const totalAppointments = appointments.length;
  const upcomingAppointments = appointments
    .filter(
      (apt) =>
        apt.status === AppointmentStatus.Confirmed || apt.status === AppointmentStatus.Pending,
    )
    .slice(0, 3);
  const completedAppointments = appointments.filter(
    (apt) => apt.status === AppointmentStatus.Completed,
  ).length;
  const pendingAppointments = appointments.filter(
    (apt) => apt.status === AppointmentStatus.Pending,
  ).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case AppointmentStatus.Completed:
        return 'bg-green-100 text-green-800';
      case AppointmentStatus.Confirmed:
        return 'bg-blue-100 text-blue-800';
      case AppointmentStatus.Pending:
        return 'bg-yellow-100 text-yellow-800';
      case AppointmentStatus.Cancelled:
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

  // Removed getClinicName - not needed

  const getProcedureName = (procedureId: string) => {
    const procedure = procedures.find((p) => p.id === procedureId);
    return procedure?.name || 'Unknown Procedure';
  };

  // Statistics data
  const statsData = [
    {
      title: 'Total Appointments',
      value: totalAppointments,
      icon: Calendar,
      iconColor: 'text-blue-500',
    },
    {
      title: 'Completed',
      value: completedAppointments,
      icon: CheckCircle,
      iconColor: 'text-green-500',
      valueColor: 'text-green-600',
    },
    {
      title: 'Pending',
      value: pendingAppointments,
      icon: AlertCircle,
      iconColor: 'text-yellow-500',
      valueColor: 'text-yellow-600',
    },
    {
      title: 'Available Doctors',
      value: doctors.length,
      icon: User,
      iconColor: 'text-purple-500',
      valueColor: 'text-purple-600',
    },
  ];

  // Quick Actions data
  const quickActionsData = [
    {
      type: 'dialog' as const,
      component: (
        <BookingDialog
          userId={user.id}
          doctors={doctors}
          procedures={procedures}
          timeSlots={timeSlots}
        />
      ),
    },
    {
      type: 'link' as const,
      href: '/procedure',
      icon: TrendingUp,
      label: 'Browse Procedures',
    },
    {
      type: 'link' as const,
      href: '/doctors',
      icon: User,
      label: 'View Doctors',
    },
    {
      type: 'link' as const,
      href: '/appointments',
      icon: Calendar,
      label: 'Manage Appointments',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          👋 Hello, {user.firstName} {user.lastName}!
        </h1>
        <p className="text-gray-600">Welcome back to your dental care dashboard</p>
      </div>

      {/* Statistics Cards */}
      <List
        data={statsData}
        renderItem={(stat) => <StatCard key={stat.title} {...stat} />}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <List
            data={quickActionsData}
            renderItem={(action) => {
              if (action.type === 'dialog') {
                return action.component;
              }
              const Icon = action.icon;
              return (
                <Link href={action.href!} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon className="mr-2 w-4 h-4" />
                    {action.label}
                  </Button>
                </Link>
              );
            }}
            className="space-y-4"
          />
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          <List
            data={upcomingAppointments}
            renderItem={(appointment) => (
              <Link href={`/appointments/${appointment.id}`} className="block">
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
                      <span>Dental Clinic</span>
                    </div>
                  </div>
                  {appointment.notes && (
                    <p className="text-sm text-gray-500 mt-2">Notes: {appointment.notes}</p>
                  )}
                </div>
              </Link>
            )}
            className="space-y-4"
            emptyMessage="No upcoming appointments"
            emptyIcon={<Calendar className="w-12 h-12 text-gray-400 mx-auto" />}
          />
          {upcomingAppointments.length === 0 && (
            <div className="text-center">
              <BookingDialog
                userId={user.id}
                doctors={doctors}
                procedures={procedures}
                timeSlots={timeSlots}
                trigger={<Button size="sm">Book Appointment</Button>}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;

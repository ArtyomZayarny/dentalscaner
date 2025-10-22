'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppContext } from '../../context/appContext';
import { useQuery } from '@apollo/client';
import { GET_APPOINTMENT_BY_ID } from '@/lib/graphql-queries';
import Loading from '../../components/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Edit,
  Save,
  X,
  ArrowLeft,
  AlertTriangle,
  DollarSign,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { AppointmentStatus } from '@/app/types/generated';

function AppointmentDetailsPage() {
  const params = useParams();
  const { user, doctors } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    date: '',
    time: '',
    notes: '',
  });

  const appointmentId = params.id as string;

  console.log('🔍 AppointmentDetailsPage Debug (Production):');
  console.log('  - appointmentId:', appointmentId);
  console.log('  - appointmentId type:', typeof appointmentId);
  console.log('  - appointmentId truthy:', !!appointmentId);
  console.log('  - user:', user);
  console.log('  - user exists:', !!user);
  console.log('  - localStorage token:', typeof window !== 'undefined' ? localStorage.getItem('auth-token') : 'SSR');
  console.log('  - GraphQL URL:', process.env.NEXT_PUBLIC_GRAPHQL_URL);
  console.log('  - window.location:', typeof window !== 'undefined' ? window.location.href : 'SSR');
  console.log('  - window.pathname:', typeof window !== 'undefined' ? window.location.pathname : 'SSR');
  console.log('  - NODE_ENV:', process.env.NODE_ENV);
  console.log('  - VERCEL:', process.env.VERCEL);
  console.log('  - params:', params);
  console.log('  - params.id:', params.id);

  // Fetch appointment by ID using GraphQL
  console.log('🔍 About to call useQuery:');
  console.log('  - appointmentId for query:', appointmentId);
  console.log('  - skip condition (!appointmentId):', !appointmentId);
  console.log('  - will skip query:', !appointmentId);
  
  const {
    data: appointmentData,
    loading: appointmentLoading,
    error: appointmentError,
  } = useQuery(GET_APPOINTMENT_BY_ID, {
    variables: { id: appointmentId },
    skip: !appointmentId,
    onCompleted: (data) => {
      console.log('🔍 GraphQL query completed:', data);
    },
    onError: (error) => {
      console.log('❌ GraphQL query error:', error);
    },
  });

  console.log('🔍 GraphQL Query Debug:');
  console.log('  - skip:', !appointmentId);
  console.log('  - variables:', { id: appointmentId });
  console.log('  - loading:', appointmentLoading);
  console.log('  - error:', appointmentError);

  console.log('  - appointmentLoading:', appointmentLoading);
  console.log('  - appointmentError:', appointmentError);
  console.log('  - appointmentData:', appointmentData);
  console.log('  - GraphQL query will be skipped:', !appointmentId);
  console.log('  - Current URL path:', typeof window !== 'undefined' ? window.location.pathname : 'SSR');

  console.log('🔍 User check:');
  console.log('  - user exists:', !!user);
  console.log('  - user object:', user);
  
  if (!user) {
    console.log('❌ No user, showing loading...');
    return <Loading />;
  }

  if (appointmentLoading) return <Loading />;

  if (appointmentError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="p-8 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Error Loading Appointment</h1>
            <p className="text-gray-600 mb-6">{appointmentError.message}</p>
            <Link href="/appointments">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Appointments
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const appointment = appointmentData?.appointment;

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="p-8 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Appointment Not Found</h1>
            <p className="text-gray-600 mb-6">
              The appointment you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/appointments">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Appointments
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const doctor = doctors.find((d) => d.id === appointment.doctorId);
  // Use procedure from appointment data (already loaded via GraphQL)
  const procedure = appointment.procedure;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // In a real app, this would update the appointment via API
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      date: appointment.date,
      time: appointment.time,
      notes: appointment.notes || '',
    });
    setIsEditing(false);
  };

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
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section with Teal Gradient */}
      <div className="relative bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-2xl mb-6 md:mb-8">
        <div className="absolute inset-0 bg-black/5 rounded-2xl"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <Link href="/appointments">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Appointments
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-white" />
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  appointment.status,
                )}`}
              >
                {appointment.status.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-white">Appointment Details</h1>
            <p className="text-xl text-teal-100">
              {procedure?.name} with {doctor?.name}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Appointment Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8 border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-teal-800">Appointment Information</h2>
              {appointment.status === AppointmentStatus.Pending && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-teal-600 hover:bg-teal-50"
                >
                  {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <span className="text-sm font-medium text-gray-600">Date</span>
                </div>
                {isEditing ? (
                  <Input
                    name="date"
                    type="date"
                    value={editForm.date}
                    onChange={handleInputChange}
                    className="w-48"
                  />
                ) : (
                  <span className="text-gray-900 font-medium">{formatDate(appointment.date)}</span>
                )}
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-cyan-600" />
                  <span className="text-sm font-medium text-gray-600">Time</span>
                </div>
                {isEditing ? (
                  <Input
                    name="time"
                    type="time"
                    value={editForm.time}
                    onChange={handleInputChange}
                    className="w-48"
                  />
                ) : (
                  <span className="text-gray-900 font-medium">{formatTime(appointment.time)}</span>
                )}
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-600">Doctor</span>
                </div>
                <span className="text-gray-900 font-medium">{doctor?.name}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-600">Procedure</span>
                </div>
                <span className="text-gray-900 font-medium">{procedure?.name}</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-600">Amount</span>
                </div>
                <span className="text-gray-900 font-medium">${appointment.amount}</span>
              </div>
            </div>

            {appointment.notes && (
              <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg border">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mt-1">
                  <FileText className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-amber-600">Notes</label>
                  {isEditing ? (
                    <textarea
                      name="notes"
                      value={editForm.notes}
                      onChange={handleInputChange}
                      className="mt-1 w-full border rounded-lg px-3 py-2 resize-none"
                      rows={3}
                    />
                  ) : (
                    <p className="text-amber-900 font-medium mt-1">{appointment.notes}</p>
                  )}
                </div>
              </div>
            )}

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-[#C7DDEB] hover:bg-[#A8C9E0] cursor-pointer"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex-1">
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Actions and Timeline */}
        <div className="lg:col-span-1 space-y-6">
          {/* Actions Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border">
            <h2 className="text-lg font-semibold mb-4 text-teal-800">Actions</h2>
            <div className="space-y-3">
              {appointment.status === AppointmentStatus.Pending && (
                <Button
                  className="w-full bg-teal-100 hover:bg-teal-200 text-teal-700"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Reschedule
                </Button>
              )}
              <Button variant="outline" className="w-full text-teal-600 hover:bg-teal-50">
                <FileText className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" className="w-full text-teal-600 hover:bg-teal-50">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>

          {/* Appointment Timeline Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border">
            <h2 className="text-lg font-semibold mb-4 text-teal-800">Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-teal-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-teal-800">Appointment Created</p>
                  <p className="text-xs text-teal-600">
                    {new Date(appointment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-cyan-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-cyan-800">Appointment Confirmed</p>
                  <p className="text-xs text-cyan-600">
                    {new Date(appointment.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              {appointment.status === AppointmentStatus.Completed && (
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Appointment Completed</p>
                    <p className="text-xs text-gray-500">Treatment finished successfully</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetailsPage;

'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppContext } from '../../context/appContext';
import Loading from '../../components/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Edit,
  Save,
  X,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Clock as ClockIcon,
  DollarSign,
  FileText,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { AppointmentStatus } from '@/app/types/generated';

function AppointmentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, appointments, doctors, procedures } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [editForm, setEditForm] = useState({
    date: '',
    time: '',
    notes: '',
  });

  if (!user || !appointments) return <Loading />;

  const appointmentId = params.id as string;
  const appointment = appointments.find((apt) => apt.id === appointmentId);

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
  // Removed clinic lookup - not needed
  const procedure = procedures.find((p) => p.id === appointment.procedureId);

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

  const handleCancelAppointment = () => {
    // In a real app, this would cancel the appointment via API
    setShowCancelDialog(false);
    router.push('/appointments');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'confirmed':
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-blue-800">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative p-8 max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/appointments">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-blue-800 hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Appointments
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              {getStatusIcon(appointment.status)}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  appointment.status,
                )}`}
              >
                {appointment.status}
              </span>
            </div>
          </div>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Appointment Details</h1>
            <p className="text-xl text-blue-100">
              {procedure?.name} with {doctor?.name} at Dental Clinic
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Information Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Appointment Information</h2>
                {appointment.status === AppointmentStatus.Pending && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Date</label>
                      {isEditing ? (
                        <Input
                          name="date"
                          type="date"
                          value={editForm.date}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{formatDate(appointment.date)}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Time</label>
                      {isEditing ? (
                        <Input
                          name="time"
                          type="time"
                          value={editForm.time}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{formatTime(appointment.time)}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Doctor</label>
                      <p className="text-gray-900 font-medium">{doctor?.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Clinic</label>
                      <p className="text-gray-900 font-medium">Dental Clinic</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Procedure</label>
                      <p className="text-gray-900 font-medium">{procedure?.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Amount</label>
                      <p className="text-gray-900 font-medium">${appointment.amount}</p>
                    </div>
                  </div>
                </div>

                {appointment.notes && (
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mt-1">
                      <FileText className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-500">Notes</label>
                      {isEditing ? (
                        <textarea
                          name="notes"
                          value={editForm.notes}
                          onChange={handleInputChange}
                          className="mt-1 w-full border rounded-lg px-3 py-2 resize-none"
                          rows={3}
                        />
                      ) : (
                        <p className="text-gray-900 mt-1">{appointment.notes}</p>
                      )}
                    </div>
                  </div>
                )}

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-[#EBF4FBBF] hover:bg-[#D1E7F5]"
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

            {/* Doctor Information Card */}
            {doctor && (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Doctor Information</h2>
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center">
                    <div className="text-3xl">👨‍⚕️</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{doctor.specialization}</p>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Professional dental care provider with expertise in{' '}
                      {doctor.specialization || 'general dentistry'}.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">Professional experience</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">Professional rating</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Clinic Information Card */}
            {true && (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Clinic Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Address</label>
                      <p className="text-gray-900 font-medium">123 Main Street, Downtown</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <p className="text-gray-900 font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900 font-medium">info@dentalclinic.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Working Hours</label>
                      <p className="text-gray-900 font-medium">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Actions</h2>
              <div className="space-y-3">
                {appointment.status === AppointmentStatus.Pending && (
                  <>
                    <Button
                      className="w-full bg-[#EBF4FBBF] hover:bg-[#D1E7F5]"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Reschedule
                    </Button>
                    <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          <X className="w-4 h-4 mr-2" />
                          Cancel Appointment
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Cancel Appointment</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to cancel this appointment? This action cannot be
                            undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                            Keep Appointment
                          </Button>
                          <Button variant="destructive" onClick={handleCancelAppointment}>
                            Cancel Appointment
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>

            {/* Appointment Timeline Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Appointment Created</p>
                    <p className="text-xs text-gray-500">
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
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Appointment Confirmed</p>
                    <p className="text-xs text-gray-500">
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
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Appointment Completed</p>
                      <p className="text-xs text-gray-500">Treatment finished successfully</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetailsPage;

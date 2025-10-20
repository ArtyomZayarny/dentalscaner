'use client';
import React, { useState } from 'react';
import { useAppContext } from '../context/appContext';
import Loading from '../components/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Calendar, MapPin, Phone, Mail, Edit, Save, X } from 'lucide-react';

function ProfilePage() {
  const { user } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    dateOfBirth: user?.dateOfBirth || '',
  });

  if (!user) return <Loading />;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      fullName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      dateOfBirth: user?.dateOfBirth || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-black">👤 Profile</h1>
        <p className="text-gray-600 text-sm md:text-base">Manage your personal information</p>
      </div>

      {/* Profile Information */}
      <div className="max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-semibold">Personal Information</h2>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
            </Button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <User className="w-6 h-6 text-gray-400" />
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                {isEditing ? (
                  <Input
                    name="fullName"
                    value={editForm.fullName}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                ) : (
                  <p className="text-gray-900 text-lg">
                    {user.firstName} {user.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-gray-400" />
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-500">Email</label>
                {isEditing ? (
                  <Input
                    name="email"
                    type="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                ) : (
                  <p className="text-gray-900 text-lg">{user.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-gray-400" />
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-500">Phone</label>
                {isEditing ? (
                  <Input
                    name="phone"
                    value={editForm.phone}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                ) : (
                  <p className="text-gray-900 text-lg">Not provided</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-gray-400" />
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-500">Address</label>
                {isEditing ? (
                  <Input
                    name="address"
                    value={editForm.address}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                ) : (
                  <p className="text-gray-900 text-lg">{user.address || 'Not provided'}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Calendar className="w-6 h-6 text-gray-400" />
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                {isEditing ? (
                  <Input
                    name="dateOfBirth"
                    type="date"
                    value={editForm.dateOfBirth}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                ) : (
                  <p className="text-gray-900 text-lg">Not provided</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-6">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex-1">
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

import { User } from '../entities/user.entity';

export const seedUsers: Partial<User>[] = [
  {
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'patient',
    phone: '+1234567890',
    address: '123 Main St, New York, NY',
    dateOfBirth: new Date('1990-05-15'),
  },
  {
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'patient',
    phone: '+1234567891',
    address: '456 Oak Ave, Los Angeles, CA',
    dateOfBirth: new Date('1985-08-22'),
  },
  {
    email: 'mike.johnson@example.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    role: 'patient',
    phone: '+1234567892',
    address: '789 Pine Rd, Chicago, IL',
    dateOfBirth: new Date('1992-03-10'),
  },
  {
    email: 'sarah.wilson@example.com',
    firstName: 'Sarah',
    lastName: 'Wilson',
    role: 'patient',
    phone: '+1234567893',
    address: '321 Elm St, Miami, FL',
    dateOfBirth: new Date('1988-12-05'),
  },
];

// Mock data for doctors, clinics, and procedures with valid UUIDs
export const mockDoctors = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Dr. Sarah Johnson',
    specialization: 'General Dentistry',
    avatar: 'https://example.com/avatar1.jpg',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Dr. Michael Chen',
    specialization: 'Orthodontics',
    avatar: 'https://example.com/avatar2.jpg',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Endodontics',
    avatar: 'https://example.com/avatar3.jpg',
  },
];

export const mockClinics = [
  {
    id: '550e8400-e29b-41d4-a716-446655440101',
    name: 'Bright Smile Dental Clinic',
    address: '123 Main Street, Downtown',
    phone: '+1 (555) 123-4567',
    email: 'info@brightsmile.com',
    description: 'Modern dental clinic with state-of-the-art equipment',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440102',
    name: 'Family Dental Care',
    address: '456 Oak Avenue, Westside',
    phone: '+1 (555) 987-6543',
    email: 'contact@familydental.com',
    description: 'Family-friendly dental care for all ages',
  },
];

export const mockProcedures = [
  {
    id: '550e8400-e29b-41d4-a716-446655440201',
    name: 'Routine Dental Check-up',
    description: 'Comprehensive oral examination including X-rays and cleaning',
    duration: 60,
    price: 80,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440202',
    name: 'Professional Teeth Cleaning',
    description: 'Deep cleaning to remove plaque and tartar buildup',
    duration: 45,
    price: 100,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440203',
    name: 'Cavity Filling',
    description: 'Painless treatment to restore damaged teeth',
    duration: 30,
    price: 200,
  },
];

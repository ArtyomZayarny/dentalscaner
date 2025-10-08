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

// Mock data for doctors, clinics, and procedures
export const mockDoctors = [
  {
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@dentalclinic.com',
    specialization: 'General Dentistry',
    avatar: '/images/doctors/doctor-1.png',
  },
  {
    name: 'Dr. Michael Chen',
    email: 'michael.chen@dentalclinic.com',
    specialization: 'Orthodontics',
    avatar: '/images/doctors/doctor-2.png',
  },
  {
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@dentalclinic.com',
    specialization: 'Endodontics',
    avatar: '/images/doctors/doctor-3.png',
  },
];

// Removed mockClinics - not needed

export const mockProcedures = [
  {
    name: 'Routine Dental Check-up',
    description: 'Comprehensive oral examination including X-rays and cleaning',
    duration: 60,
    price: 100,
    image: '/images/procedures/procedure-1.png',
  },
  {
    name: 'Professional Teeth Cleaning',
    description: 'Deep cleaning to remove plaque and tartar buildup',
    duration: 45,
    price: 80,
    image: '/images/procedures/procedure-2.png',
  },
  {
    name: 'Cavity Filling',
    description: 'Painless treatment to restore damaged teeth',
    duration: 30,
    price: 200,
    image: '/images/procedures/procedure-3.png',
  },
];

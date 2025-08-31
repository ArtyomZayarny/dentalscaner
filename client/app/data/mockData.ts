import { Doctor, Clinic, Procedure, AppointmentStatus } from '../types/generated';

export const mockDoctors: Doctor[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Dr. Sarah Johnson',
    specialization: 'General Dentistry',
    avatar: '/doctors/doctor-1.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Dr. Michael Chen',
    specialization: 'Orthodontics',
    avatar: '/doctors/doctor-2.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Endodontics',
    avatar: '/doctors/doctor-3.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockClinics: Clinic[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440101',
    name: 'Bright Smile Dental Clinic',
    address: '123 Main Street, Downtown',
    phone: '+1 (555) 123-4567',
    email: 'info@brightsmile.com',
    description: 'Professional dental care in downtown',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440102',
    name: 'Family Dental Care',
    address: '456 Oak Avenue, Westside',
    phone: '+1 (555) 987-6543',
    email: 'contact@familydental.com',
    description: 'Family-friendly dental services',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockProcedures: Procedure[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440201',
    name: 'Routine Dental Check-up',
    description: 'Comprehensive oral examination including X-rays and cleaning',
    duration: 60,
    price: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440202',
    name: 'Professional Teeth Cleaning',
    description: 'Deep cleaning to remove plaque and tartar buildup',
    duration: 45,
    price: 80,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440203',
    name: 'Cavity Filling',
    description: 'Painless treatment to restore damaged teeth',
    duration: 30,
    price: 200,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440204',
    name: 'Teeth Whitening',
    description: 'Professional whitening treatment for a brighter smile',
    duration: 90,
    price: 300,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440205',
    name: 'Emergency Tooth Extraction',
    description: 'Urgent removal of severely damaged or infected teeth',
    duration: 45,
    price: 350,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface TimeSlot {
  id: string;
  doctorId: string;
  clinicId: string;
  date: string;
  time: string;
  isAvailable: boolean;
  duration: number;
}

// Helper function to generate time slots for a date range
function generateTimeSlots(
  startDate: Date,
  endDate: Date,
  doctors: Doctor[],
  clinics: Clinic[],
): TimeSlot[] {
  const timeSlots: TimeSlot[] = [];
  let slotId = 1;

  // Define time slots (5 slots per day)
  const timeSlotsPerDay = ['09:00', '10:00', '11:00', '14:00', '15:00'];

  // Map doctor working days to day numbers (0 = Sunday, 1 = Monday, etc.)
  const dayMap: { [key: string]: number } = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  // Default available days for all doctors
  const defaultAvailableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    const dateStr = d.toISOString().split('T')[0];

    // Check each doctor's availability for this day
    doctors.forEach((doctor) => {
      const isAvailableOnDay = defaultAvailableDays.some((day) => dayMap[day] === dayOfWeek);

      if (isAvailableOnDay) {
        // Generate 5 time slots for this doctor on this day
        timeSlotsPerDay.forEach((time) => {
          // Randomly make some slots unavailable (20% chance)
          const isAvailable = Math.random() > 0.2;

          // Assign to a random clinic
          const clinic = clinics[Math.floor(Math.random() * clinics.length)];

          timeSlots.push({
            id: `slot-${slotId++}`,
            doctorId: doctor.id,
            clinicId: clinic.id,
            date: dateStr,
            time: time,
            isAvailable: isAvailable,
            duration: 60,
          });
        });
      }
    });
  }

  return timeSlots;
}

// Generate time slots for August and September 2025
const augustStart = new Date('2025-08-01');
const septemberEnd = new Date('2025-09-30');

export const mockTimeSlots: TimeSlot[] = generateTimeSlots(
  augustStart,
  septemberEnd,
  mockDoctors,
  mockClinics,
);

export const mockAppointments = [
  {
    id: 'apt-1',
    userId: 'f7984366-3ae9-49d8-b133-47474d4d1231', // John Doe's ID
    doctorId: '550e8400-e29b-41d4-a716-446655440001',
    clinicId: '550e8400-e29b-41d4-a716-446655440101',
    procedureId: '550e8400-e29b-41d4-a716-446655440201',
    date: '2025-08-15',
    time: '09:00',
    duration: 60,
    amount: 100,
    status: AppointmentStatus.Confirmed,
    notes: 'Regular check-up',
    paid: false,
    createdAt: new Date('2025-08-10T10:00:00Z'),
    updatedAt: new Date('2025-08-10T10:00:00Z'),
  },
  {
    id: 'apt-2',
    userId: 'f7984366-3ae9-49d8-b133-47474d4d1231', // John Doe's ID
    doctorId: '550e8400-e29b-41d4-a716-446655440002',
    clinicId: '550e8400-e29b-41d4-a716-446655440101',
    procedureId: '550e8400-e29b-41d4-a716-446655440202',
    date: '2025-08-20',
    time: '14:00',
    duration: 45,
    amount: 80,
    status: AppointmentStatus.Pending,
    notes: 'Deep cleaning session',
    paid: false,
    createdAt: new Date('2025-08-12T15:30:00Z'),
    updatedAt: new Date('2025-08-12T15:30:00Z'),
  },
  {
    id: 'apt-3',
    userId: 'f7984366-3ae9-49d8-b133-47474d4d1231', // John Doe's ID
    doctorId: '550e8400-e29b-41d4-a716-446655440003',
    clinicId: '550e8400-e29b-41d4-a716-446655440102',
    procedureId: '550e8400-e29b-41d4-a716-446655440203',
    date: '2025-09-05',
    time: '11:00',
    duration: 30,
    amount: 200,
    status: AppointmentStatus.Completed,
    notes: 'Cavity filling on molar',
    paid: true,
    createdAt: new Date('2025-08-25T09:15:00Z'),
    updatedAt: new Date('2025-09-05T12:00:00Z'),
  },
];

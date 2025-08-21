import { IDoctor, IClinic, IProcedure, ITimeSlot, IAppointment } from '../types';

export const mockDoctors: IDoctor[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Dr. Sarah Johnson',
    specialization: 'General Dentistry',
    experience: 8,
    rating: 4.8,
    image: '/doctors/doctor-1.jpg',
    bio: 'Experienced general dentist with focus on preventive care and patient comfort.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '09:00', end: '17:00' },
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Dr. Michael Chen',
    specialization: 'Orthodontics',
    experience: 12,
    rating: 4.9,
    image: '/doctors/doctor-2.jpg',
    bio: 'Specialist in orthodontics with expertise in braces and Invisalign treatment.',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    workingHours: { start: '10:00', end: '18:00' },
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Endodontics',
    experience: 6,
    rating: 4.7,
    image: '/doctors/doctor-3.jpg',
    bio: 'Root canal specialist committed to pain-free treatment experiences.',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    workingHours: { start: '08:00', end: '16:00' },
  },
];

export const mockClinics: IClinic[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440101',
    name: 'Bright Smile Dental Clinic',
    address: '123 Main Street, Downtown',
    phone: '+1 (555) 123-4567',
    email: 'info@brightsmile.com',
    image: '/clinics/clinic-1.jpg',
    rating: 4.6,
    workingHours: { start: '08:00', end: '18:00' },
    doctors: ['550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002'],
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440102',
    name: 'Family Dental Care',
    address: '456 Oak Avenue, Westside',
    phone: '+1 (555) 987-6543',
    email: 'contact@familydental.com',
    image: '/clinics/clinic-2.jpg',
    rating: 4.4,
    workingHours: { start: '09:00', end: '17:00' },
    doctors: ['550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003'],
  },
];

export const mockProcedures: IProcedure[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440201',
    name: 'Routine Dental Check-up',
    description: 'Comprehensive oral examination including X-rays and cleaning',
    duration: 60,
    price: { min: 80, max: 120, currency: 'USD' },
    category: 'checkup',
    image: '/procedures/checkup.jpg',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440202',
    name: 'Professional Teeth Cleaning',
    description: 'Deep cleaning to remove plaque and tartar buildup',
    duration: 45,
    price: { min: 60, max: 100, currency: 'USD' },
    category: 'treatment',
    image: '/procedures/cleaning.jpg',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440203',
    name: 'Cavity Filling',
    description: 'Painless treatment to restore damaged teeth',
    duration: 30,
    price: { min: 150, max: 300, currency: 'USD' },
    category: 'treatment',
    image: '/procedures/filling.jpg',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440204',
    name: 'Teeth Whitening',
    description: 'Professional whitening treatment for a brighter smile',
    duration: 90,
    price: { min: 200, max: 400, currency: 'USD' },
    category: 'cosmetic',
    image: '/procedures/whitening.jpg',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440205',
    name: 'Emergency Tooth Extraction',
    description: 'Urgent removal of severely damaged or infected teeth',
    duration: 45,
    price: { min: 200, max: 500, currency: 'USD' },
    category: 'emergency',
    image: '/procedures/extraction.jpg',
  },
];

// Helper function to generate time slots for a date range
function generateTimeSlots(
  startDate: Date,
  endDate: Date,
  doctors: IDoctor[],
  clinics: IClinic[],
): ITimeSlot[] {
  const timeSlots: ITimeSlot[] = [];
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

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    const dateStr = d.toISOString().split('T')[0];

    // Check each doctor's availability for this day
    doctors.forEach((doctor) => {
      const isAvailableOnDay = doctor.availableDays.some((day) => dayMap[day] === dayOfWeek);

      if (isAvailableOnDay) {
        // Get clinics where this doctor works
        const doctorClinics = clinics.filter((clinic) => clinic.doctors.includes(doctor.id));

        // Generate 5 time slots for this doctor on this day
        timeSlotsPerDay.forEach((time) => {
          // Randomly make some slots unavailable (20% chance)
          const isAvailable = Math.random() > 0.2;

          // Assign to a random clinic where the doctor works
          const clinic = doctorClinics[Math.floor(Math.random() * doctorClinics.length)];

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

export const mockTimeSlots: ITimeSlot[] = generateTimeSlots(
  augustStart,
  septemberEnd,
  mockDoctors,
  mockClinics,
);

export const mockAppointments: IAppointment[] = [
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
    status: 'confirmed',
    notes: 'Regular check-up',
    createdAt: '2025-08-10T10:00:00Z',
    updatedAt: '2025-08-10T10:00:00Z',
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
    status: 'pending',
    notes: 'Deep cleaning session',
    createdAt: '2025-08-12T15:30:00Z',
    updatedAt: '2025-08-12T15:30:00Z',
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
    status: 'completed',
    notes: 'Cavity filling on molar',
    createdAt: '2025-08-25T09:15:00Z',
    updatedAt: '2025-09-05T12:00:00Z',
  },
];

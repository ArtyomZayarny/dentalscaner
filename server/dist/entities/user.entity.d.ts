import { Appointment } from './appointment.entity';
export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    dateOfBirth?: Date;
    address?: string;
    role: 'patient' | 'doctor' | 'admin';
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
    appointments: Appointment[];
}

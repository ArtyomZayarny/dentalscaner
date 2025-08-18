import { User } from './user.type';
import { Doctor } from './doctor.type';
import { Procedure } from './procedure.type';
import { Clinic } from './clinic.type';
export declare enum AppointmentStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class Appointment {
    id: string;
    date: Date;
    time: string;
    status: AppointmentStatus;
    amount: number;
    notes?: string;
    stripePaymentIntentId?: string;
    isPaid: boolean;
    user: User;
    doctor: Doctor;
    procedure: Procedure;
    clinic: Clinic;
    createdAt: Date;
    updatedAt: Date;
}

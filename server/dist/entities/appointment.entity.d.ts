import { User } from './user.entity';
import { Doctor } from './doctor.entity';
import { Procedure } from './procedure.entity';
import { Clinic } from './clinic.entity';
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
    userId: string;
    doctor: Doctor;
    doctorId: string;
    procedure: Procedure;
    procedureId: string;
    clinic: Clinic;
    clinicId: string;
    createdAt: Date;
    updatedAt: Date;
}

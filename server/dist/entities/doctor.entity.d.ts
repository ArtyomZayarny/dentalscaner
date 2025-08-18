import { Clinic } from './clinic.entity';
import { Appointment } from './appointment.entity';
import { Procedure } from './procedure.entity';
export declare class Doctor {
    id: string;
    firstName: string;
    lastName: string;
    specialization: string;
    bio?: string;
    avatar?: string;
    rating: number;
    reviewCount: number;
    availability?: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    };
    clinic: Clinic;
    clinicId: string;
    appointments: Appointment[];
    procedures: Procedure[];
    createdAt: Date;
    updatedAt: Date;
}

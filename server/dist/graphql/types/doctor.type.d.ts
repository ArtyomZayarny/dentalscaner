import { Clinic } from './clinic.type';
import { Procedure } from './procedure.type';
export declare class DoctorAvailability {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
}
export declare class Doctor {
    id: string;
    firstName: string;
    lastName: string;
    specialization: string;
    bio?: string;
    avatar?: string;
    rating: number;
    reviewCount: number;
    availability?: DoctorAvailability;
    clinic: Clinic;
    procedures?: Procedure[];
    createdAt: Date;
    updatedAt: Date;
}

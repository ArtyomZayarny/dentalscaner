import { Doctor } from './doctor.entity';
export declare class Clinic {
    id: string;
    name: string;
    address: string;
    phone?: string;
    email?: string;
    description?: string;
    image?: string;
    workingHours?: {
        monday: {
            start: string;
            end: string;
        };
        tuesday: {
            start: string;
            end: string;
        };
        wednesday: {
            start: string;
            end: string;
        };
        thursday: {
            start: string;
            end: string;
        };
        friday: {
            start: string;
            end: string;
        };
        saturday: {
            start: string;
            end: string;
        };
        sunday: {
            start: string;
            end: string;
        };
    };
    createdAt: Date;
    updatedAt: Date;
    doctors: Doctor[];
}

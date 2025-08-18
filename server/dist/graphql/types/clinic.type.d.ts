export declare class WorkingHours {
    start: string;
    end: string;
}
export declare class ClinicWorkingHours {
    monday: WorkingHours;
    tuesday: WorkingHours;
    wednesday: WorkingHours;
    thursday: WorkingHours;
    friday: WorkingHours;
    saturday: WorkingHours;
    sunday: WorkingHours;
}
export declare class Clinic {
    id: string;
    name: string;
    address: string;
    phone?: string;
    email?: string;
    description?: string;
    image?: string;
    workingHours?: ClinicWorkingHours;
    createdAt: Date;
    updatedAt: Date;
}

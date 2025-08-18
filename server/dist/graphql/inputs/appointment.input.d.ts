export declare class CreateAppointmentInput {
    date: Date;
    time: string;
    doctorId: string;
    procedureId: string;
    notes?: string;
}
export declare class UpdateAppointmentInput {
    id: string;
    date?: Date;
    time?: string;
    doctorId?: string;
    procedureId?: string;
    notes?: string;
}

import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { User } from '../entities/user.entity';
import { Doctor } from '../entities/doctor.entity';
import { Procedure } from '../entities/procedure.entity';
import { Clinic } from '../entities/clinic.entity';
import { CreateAppointmentInput, UpdateAppointmentInput } from '../graphql/inputs/appointment.input';
export declare class AppointmentService {
    private appointmentRepository;
    private userRepository;
    private doctorRepository;
    private procedureRepository;
    private clinicRepository;
    constructor(appointmentRepository: Repository<Appointment>, userRepository: Repository<User>, doctorRepository: Repository<Doctor>, procedureRepository: Repository<Procedure>, clinicRepository: Repository<Clinic>);
    findAll(): Promise<Appointment[]>;
    findById(id: string): Promise<Appointment | null>;
    findByUserId(userId: string): Promise<Appointment[]>;
    create(input: CreateAppointmentInput, userId: string): Promise<Appointment>;
    update(input: UpdateAppointmentInput): Promise<Appointment>;
    cancel(id: string): Promise<Appointment>;
    confirmPayment(id: string, stripePaymentIntentId: string): Promise<Appointment>;
}

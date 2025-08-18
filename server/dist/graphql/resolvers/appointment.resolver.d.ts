import { AppointmentService } from '../../services/appointment.service';
import { StripeService } from '../../services/stripe.service';
import { Appointment } from '../types/appointment.type';
import { CreateAppointmentInput, UpdateAppointmentInput } from '../inputs/appointment.input';
export declare class AppointmentResolver {
    private appointmentService;
    private stripeService;
    constructor(appointmentService: AppointmentService, stripeService: StripeService);
    appointments(): Promise<Appointment[]>;
    appointment(id: string): Promise<Appointment | null>;
    userAppointments(userId: string): Promise<Appointment[]>;
    createAppointment(input: CreateAppointmentInput, userId: string): Promise<Appointment>;
    updateAppointment(input: UpdateAppointmentInput): Promise<Appointment>;
    cancelAppointment(id: string): Promise<Appointment>;
    createPaymentSession(appointmentId: string): Promise<string>;
    confirmPayment(appointmentId: string, paymentIntentId: string): Promise<Appointment>;
}

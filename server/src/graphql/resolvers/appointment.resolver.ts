import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AppointmentService } from '../../services/appointment.service';
import { StripeService } from '../../services/stripe.service';
import { Appointment } from '../types/appointment.type';
import {
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from '../inputs/appointment.input';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(
    private appointmentService: AppointmentService,
    private stripeService: StripeService,
  ) {}

  @Query(() => [Appointment])
  async appointments(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Query(() => Appointment)
  async appointment(@Args('id') id: string): Promise<Appointment | null> {
    return this.appointmentService.findById(id);
  }

  @Query(() => [Appointment])
  async userAppointments(
    @Args('userId') userId: string,
  ): Promise<Appointment[]> {
    return this.appointmentService.findByUserId(userId);
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('input') input: CreateAppointmentInput,
    @Args('userId') userId: string,
  ): Promise<Appointment> {
    return this.appointmentService.create(input, userId);
  }

  @Mutation(() => Appointment)
  async updateAppointment(
    @Args('input') input: UpdateAppointmentInput,
  ): Promise<Appointment> {
    return this.appointmentService.update(input);
  }

  @Mutation(() => Appointment)
  async cancelAppointment(@Args('id') id: string): Promise<Appointment> {
    return this.appointmentService.cancel(id);
  }

  @Mutation(() => String)
  async createPaymentSession(
    @Args('appointmentId') appointmentId: string,
  ): Promise<string> {
    const appointment = await this.appointmentService.findById(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    const session = await this.stripeService.createCheckoutSession(
      appointment.amount,
      appointmentId,
      {
        doctorName: `${appointment.doctor.firstName} ${appointment.doctor.lastName}`,
        procedureName: appointment.procedure.name,
        date: appointment.date.toISOString().split('T')[0],
        time: appointment.time,
      },
    );

    return session.url || '';
  }

  @Mutation(() => Appointment)
  async confirmPayment(
    @Args('appointmentId') appointmentId: string,
    @Args('paymentIntentId') paymentIntentId: string,
  ): Promise<Appointment> {
    return this.appointmentService.confirmPayment(
      appointmentId,
      paymentIntentId,
    );
  }
}

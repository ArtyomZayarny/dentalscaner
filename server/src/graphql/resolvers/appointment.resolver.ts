import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { AppointmentService } from '../../services/appointment.service';
import {
  Appointment,
  AppointmentStatus,
} from '../../entities/appointment.entity';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Query(() => [Appointment])
  async appointments() {
    return this.appointmentService.findAll();
  }

  @Query(() => [Appointment])
  async appointmentsByUserId(
    @Args('userId', { type: () => String }) userId: string,
  ) {
    return this.appointmentService.findByUserId(userId);
  }

  @Query(() => Appointment)
  async appointment(@Args('id', { type: () => String }) id: string) {
    return this.appointmentService.findOne(id);
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('userId', { type: () => String }) userId: string,
    @Args('doctorId', { type: () => String }) doctorId: string,
    @Args('clinicId', { type: () => String }) clinicId: string,
    @Args('procedureId', { type: () => String }) procedureId: string,
    @Args('date', { type: () => String }) date: string,
    @Args('time', { type: () => String }) time: string,
    @Args('duration', { type: () => Int }) duration: number,
    @Args('amount', { type: () => Float }) amount: number,
    @Args('notes', { type: () => String, nullable: true }) notes?: string,
  ) {
    return this.appointmentService.create({
      userId,
      doctorId,
      clinicId,
      procedureId,
      date,
      time,
      duration,
      amount,
      notes,
    });
  }

  @Mutation(() => Appointment)
  async updateAppointment(
    @Args('id', { type: () => String }) id: string,
    @Args('status', { type: () => String, nullable: true }) status?: string,
    @Args('paid', { type: () => Boolean, nullable: true }) paid?: boolean,
    @Args('notes', { type: () => String, nullable: true }) notes?: string,
  ) {
    const updateData: Partial<Appointment> = {};
    if (status) updateData.status = status as AppointmentStatus;
    if (paid !== undefined) updateData.paid = paid;
    if (notes) updateData.notes = notes;

    return this.appointmentService.update(id, updateData);
  }

  @Mutation(() => Boolean)
  async deleteAppointment(@Args('id', { type: () => String }) id: string) {
    return this.appointmentService.remove(id);
  }
}

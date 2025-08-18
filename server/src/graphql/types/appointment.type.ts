import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { User } from './user.type';
import { Doctor } from './doctor.type';
import { Procedure } from './procedure.type';
import { Clinic } from './clinic.type';

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@ObjectType()
export class Appointment {
  @Field(() => ID)
  id: string;

  @Field()
  date: Date;

  @Field()
  time: string;

  @Field(() => AppointmentStatus)
  status: AppointmentStatus;

  @Field(() => Float)
  amount: number;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  stripePaymentIntentId?: string;

  @Field()
  isPaid: boolean;

  @Field(() => User)
  user: User;

  @Field(() => Doctor)
  doctor: Doctor;

  @Field(() => Procedure)
  procedure: Procedure;

  @Field(() => Clinic)
  clinic: Clinic;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

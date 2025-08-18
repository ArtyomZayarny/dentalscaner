import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {
  @Field()
  date: Date;

  @Field()
  time: string;

  @Field(() => ID)
  doctorId: string;

  @Field(() => ID)
  procedureId: string;

  @Field({ nullable: true })
  notes?: string;
}

@InputType()
export class UpdateAppointmentInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  date?: Date;

  @Field({ nullable: true })
  time?: string;

  @Field(() => ID, { nullable: true })
  doctorId?: string;

  @Field(() => ID, { nullable: true })
  procedureId?: string;

  @Field({ nullable: true })
  notes?: string;
}

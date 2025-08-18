import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class WorkingHours {
  @Field()
  start: string;

  @Field()
  end: string;
}

@ObjectType()
export class ClinicWorkingHours {
  @Field(() => WorkingHours)
  monday: WorkingHours;

  @Field(() => WorkingHours)
  tuesday: WorkingHours;

  @Field(() => WorkingHours)
  wednesday: WorkingHours;

  @Field(() => WorkingHours)
  thursday: WorkingHours;

  @Field(() => WorkingHours)
  friday: WorkingHours;

  @Field(() => WorkingHours)
  saturday: WorkingHours;

  @Field(() => WorkingHours)
  sunday: WorkingHours;
}

@ObjectType()
export class Clinic {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  image?: string;

  @Field(() => ClinicWorkingHours, { nullable: true })
  workingHours?: ClinicWorkingHours;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

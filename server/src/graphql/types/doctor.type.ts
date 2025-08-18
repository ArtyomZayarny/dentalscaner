import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Clinic } from './clinic.type';
import { Procedure } from './procedure.type';

@ObjectType()
export class DoctorAvailability {
  @Field()
  monday: boolean;

  @Field()
  tuesday: boolean;

  @Field()
  wednesday: boolean;

  @Field()
  thursday: boolean;

  @Field()
  friday: boolean;

  @Field()
  saturday: boolean;

  @Field()
  sunday: boolean;
}

@ObjectType()
export class Doctor {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  specialization: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => Float)
  rating: number;

  @Field()
  reviewCount: number;

  @Field(() => DoctorAvailability, { nullable: true })
  availability?: DoctorAvailability;

  @Field(() => Clinic)
  clinic: Clinic;

  @Field(() => [Procedure], { nullable: true })
  procedures?: Procedure[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class Procedure {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float, { nullable: true })
  priceMax?: number;

  @Field(() => Int)
  duration: number;

  @Field({ nullable: true })
  image?: string;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

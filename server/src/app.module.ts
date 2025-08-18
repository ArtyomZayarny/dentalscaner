import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { databaseConfig } from './config/database.config';

// Entities
import { User } from './entities/user.entity';
import { Clinic } from './entities/clinic.entity';
import { Doctor } from './entities/doctor.entity';
import { Procedure } from './entities/procedure.entity';
import { Appointment } from './entities/appointment.entity';

// Services
import { AppointmentService } from './services/appointment.service';
import { StripeService } from './services/stripe.service';

// Resolvers
import { AppointmentResolver } from './graphql/resolvers/appointment.resolver';

// Controllers
import { StripeWebhookController } from './controllers/stripe-webhook.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([User, Clinic, Doctor, Procedure, Appointment]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
  ],
  controllers: [StripeWebhookController],
  providers: [AppointmentService, StripeService, AppointmentResolver],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { getDatabaseConfig } from './config/database.config';

// Entities
import { User } from './entities/user.entity';
import { Appointment } from './entities/appointment.entity';
import { Doctor } from './entities/doctor.entity';
// Removed Clinic - not needed
import { Procedure } from './entities/procedure.entity';

// Services
import { UserService } from './services/user.service';
import { SeederService } from './services/seeder.service';
import { AppointmentService } from './services/appointment.service';
import { DoctorService } from './services/doctor.service';
// Removed ClinicService - not needed
import { ProcedureService } from './services/procedure.service';

// Resolvers
import { UserResolver } from './graphql/resolvers/user.resolver';
import { AppointmentResolver } from './graphql/resolvers/appointment.resolver';
import { DoctorResolver } from './graphql/resolvers/doctor.resolver';
// Removed ClinicResolver - not needed
import { ProcedureResolver } from './graphql/resolvers/procedure.resolver';

// Controllers
import { SeederController } from './controllers/seeder.controller';
import { HealthController } from './controllers/health.controller';
import { PaymentController } from './controllers/payment.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Appointment, Doctor, Procedure]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
  ],
  controllers: [SeederController, HealthController, PaymentController],
  providers: [
    UserService,
    SeederService,
    AppointmentService,
    DoctorService,
    // Removed ClinicService - not needed
    ProcedureService,
    UserResolver,
    AppointmentResolver,
    DoctorResolver,
    // Removed ClinicResolver - not needed
    ProcedureResolver,
  ],
})
export class AppModule {}

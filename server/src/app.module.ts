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
import { Clinic } from './entities/clinic.entity';
import { Procedure } from './entities/procedure.entity';

// Services
import { UserService } from './services/user.service';
import { SeederService } from './services/seeder.service';
import { AppointmentService } from './services/appointment.service';

// Resolvers
import { UserResolver } from './graphql/resolvers/user.resolver';
import { AppointmentResolver } from './graphql/resolvers/appointment.resolver';

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
    TypeOrmModule.forFeature([User, Appointment, Doctor, Clinic, Procedure]),
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
    UserResolver,
    AppointmentResolver,
  ],
})
export class AppModule {}

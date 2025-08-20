import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { databaseConfig } from './config/database.config';

// Entities
import { User } from './entities/user.entity';

// Services
import { UserService } from './services/user.service';
import { SeederService } from './services/seeder.service';

// Resolvers
import { UserResolver } from './graphql/resolvers/user.resolver';

// Controllers
import { SeederController } from './controllers/seeder.controller';
import { HealthController } from './controllers/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([User]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
  ],
  controllers: [SeederController, HealthController],
  providers: [UserService, SeederService, UserResolver],
})
export class AppModule {}

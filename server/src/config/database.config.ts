import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  // Debug: Log environment variables

  return {
    type: 'postgres',
    host: configService.get('DATABASE_HOST') || 'localhost',
    port: parseInt(configService.get('DATABASE_PORT') || '5432'),
    username: configService.get('DATABASE_USER') || 'postgres',
    password: configService.get('DATABASE_PASSWORD') || 'password',
    database: configService.get('DATABASE_NAME') || 'postgres',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // Enable auto-sync to update schema
    logging: configService.get('NODE_ENV') !== 'production',
    ssl: {
      rejectUnauthorized: false,
    },
  };
};

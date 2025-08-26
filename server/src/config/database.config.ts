import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  // Debug: Log environment variables
  console.log('Database Config Debug:');
  console.log('DATABASE_HOST:', configService.get('DATABASE_HOST'));
  console.log('DATABASE_USER:', configService.get('DATABASE_USER'));
  console.log('DATABASE_NAME:', configService.get('DATABASE_NAME'));
  console.log('DATABASE_PORT:', configService.get('DATABASE_PORT'));
  console.log('NODE_ENV:', configService.get('NODE_ENV'));

  return {
    type: 'postgres',
    host: configService.get('DATABASE_HOST') || 'localhost',
    port: parseInt(configService.get('DATABASE_PORT') || '5432'),
    username: configService.get('DATABASE_USER') || 'postgres',
    password: configService.get('DATABASE_PASSWORD') || 'password',
    database: configService.get('DATABASE_NAME') || 'postgres',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false, // Disable auto-sync since we have the correct schema
    logging: configService.get('NODE_ENV') !== 'production',
    ssl: {
      rejectUnauthorized: false,
    },
  };
};

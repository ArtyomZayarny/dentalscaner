import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for both development and production
  const allowedOrigins = [
    'http://localhost:3000', // Development
    process.env.FRONTEND_URL, // From environment variable
    process.env.PRODUCTION_FRONTEND_URL, // Production frontend URL
  ].filter(Boolean); // Remove undefined values

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  await app.listen(process.env.PORT ?? 3001);
}

// For Vercel serverless deployment
if (process.env.NODE_ENV !== 'production') {
  void bootstrap();
}

// Export for Vercel - always run in production
export default bootstrap;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for Vercel deployment
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}

// For Vercel serverless deployment
if (process.env.NODE_ENV !== 'production') {
  void bootstrap();
}

// Export for Vercel
export default bootstrap;

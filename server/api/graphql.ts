import type { VercelRequest, VercelResponse } from '@vercel/node';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import * as express from 'express';

let app: INestApplication | null = null;

async function bootstrap() {
  if (!app) {
    const expressApp = express();
    app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

    // Enable CORS for both development and production
    const allowedOrigins = [
      'http://localhost:3000', // Development
      process.env.FRONTEND_URL, // From environment variable
      process.env.PRODUCTION_FRONTEND_URL, // Production frontend URL
    ].filter(Boolean); // Remove undefined values

    app.enableCors({
      origin: (
        origin: string,
        callback: (error: Error | null, allow?: boolean) => void,
      ) => {
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

    await app.init();
  }
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const app = await bootstrap();
    const expressApp = app.getHttpAdapter().getInstance();

    // Handle the request with Express
    expressApp(req, res);
  } catch (error) {
    console.error('GraphQL API Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'GraphQL server error',
    });
  }
}

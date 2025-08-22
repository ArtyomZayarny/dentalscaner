import type { VercelRequest, VercelResponse } from '@vercel/node';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

let app: INestApplication | null = null;

async function bootstrap() {
  try {
    if (!app) {
      app = await NestFactory.create(AppModule);

      // CORS configuration
      app.enableCors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
          'Content-Type',
          'Authorization',
          'X-Requested-With',
          'Apollo-Require-Preflight',
        ],
      });

      await app.init();
    }
    return app;
  } catch (error) {
    console.error('Error in bootstrap:', error);
    throw error;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With, Apollo-Require-Preflight',
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests explicitly
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const app = await bootstrap();
    const httpAdapter = app.getHttpAdapter();
    const instance = httpAdapter.getInstance() as any;

    if (instance && typeof instance === 'function') {
      instance(req, res);
    } else {
      throw new Error('HTTP adapter instance is not available');
    }
  } catch (error: unknown) {
    console.error('GraphQL API Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'GraphQL server error',
      details: errorMessage,
    });
  }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

let app: INestApplication | null = null;

async function bootstrap() {
  console.log('Starting bootstrap process...');
  try {
    if (!app) {
      console.log('Creating new NestJS application...');
      app = await NestFactory.create(AppModule);
      console.log('NestJS application created successfully');

      // Simplified CORS configuration
      console.log('Configuring CORS...');
      app.enableCors({
        origin: true, // Allow all origins for now
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
          'Content-Type',
          'Authorization',
          'X-Requested-With',
          'Apollo-Require-Preflight',
        ],
      });
      console.log('CORS configured successfully');

      console.log('Initializing NestJS application...');
      await app.init();
      console.log('NestJS application initialized successfully');
    } else {
      console.log('Using existing NestJS application');
    }
    return app;
  } catch (error) {
    console.error('Error in bootstrap:', error);
    throw error;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('GraphQL handler called:', req.method, req.url);
  console.log('Origin:', req.headers.origin);

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
    console.log('Handling OPTIONS preflight request');
    res.status(200).end();
    return;
  }

  try {
    console.log('Starting NestJS application bootstrap...');
    const app = await bootstrap();
    console.log('NestJS application bootstrap completed');

    console.log('Getting HTTP adapter...');
    const httpAdapter = app.getHttpAdapter();
    console.log('HTTP adapter obtained');

    console.log('Handling request with NestJS...');
    // Use the HTTP adapter's request handler
    const instance = httpAdapter.getInstance();
    if (instance && typeof instance === 'function') {
      instance(req, res);
    } else {
      throw new Error('HTTP adapter instance is not available');
    }
    console.log('Request handled successfully');
  } catch (error: unknown) {
    console.error('GraphQL API Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error('Error stack:', errorStack);
    console.error('Error message:', errorMessage);

    // Send a more detailed error response
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'GraphQL server error',
      details: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? errorStack : undefined,
    });
  }
}

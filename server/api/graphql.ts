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

    // Simplified CORS configuration
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

    await app.init();
  }
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('GraphQL handler called:', req.method, req.url);
  console.log('Origin:', req.headers.origin);
  console.log('Headers:', req.headers);

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
    const app = await bootstrap();
    const expressApp = app
      .getHttpAdapter()
      .getInstance() as express.Application;

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

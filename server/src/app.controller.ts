import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status')
  getStatus() {
    return {
      message: 'Server is live! 🚀',
      status: 'running',
      timestamp: new Date().toISOString(),
      service: 'dental-scaner-backend',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        graphql: '/graphql',
        status: '/status',
      },
    };
  }
}

import { Controller, Post, Get } from '@nestjs/common';
import { SeederService } from '../services/seeder.service';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('seed')
  async seed() {
    try {
      return await this.seederService.seed();
    } catch (error) {
      console.error('Seeder error:', error);
      return { error: error.message, stack: error.stack };
    }
  }

  @Get('stats')
  async getStats() {
    return await this.seederService.getSeedStats();
  }
}

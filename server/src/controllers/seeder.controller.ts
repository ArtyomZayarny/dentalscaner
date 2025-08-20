import { Controller, Post, Get } from '@nestjs/common';
import { SeederService } from '../services/seeder.service';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('seed')
  async seed() {
    return await this.seederService.seed();
  }

  @Get('stats')
  async getStats() {
    return await this.seederService.getSeedStats();
  }
}

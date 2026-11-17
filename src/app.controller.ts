import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('reports')
  createReport() {
    return this.appService.createReport();
  }

  @Get('reports/jobs/:id')
  getJobStatus(@Param('id') id: string) {
    return this.appService.getJobStatus(id);
  }

  @Post('reports/jobs/:id/retry')
  retryJob(@Param('id') id: string) {
    return this.appService.retryJob(id);
  }
}

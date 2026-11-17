import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('report-queue')
    private readonly reportQueue: Queue,
  ) {}

  async createReport() {
    const job = await this.reportQueue.add(
      'generate-report',
      {
        reportId: 'delayed-report-123',
        format: 'pdf',
      },
      {
        delay: 30000, // 30 seconds
      },
    );

    return {
      jobId: job.id,
      message: 'Report scheduled',
      delay: '30 seconds',
    };
  }
}

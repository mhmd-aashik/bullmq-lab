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
    const job = await this.reportQueue.add('generate-report', {
      reportId: 'report-123',
      format: 'pdf',
    });

    return {
      message: 'Report job added',
      jobId: job.id,
      status: 'queued',
    };
  }
}

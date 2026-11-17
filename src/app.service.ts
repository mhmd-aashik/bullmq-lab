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
    const jobs = await this.reportQueue.addBulk([
      {
        name: 'generate-report',
        data: { reportId: 'free-report' },
        opts: { priority: 10 },
      },
      {
        name: 'generate-report',
        data: { reportId: 'business-report' },
        opts: { priority: 5 },
      },
      {
        name: 'generate-report',
        data: { reportId: 'vip-report' },
        opts: { priority: 1 },
      },
    ]);

    return jobs.map((job) => ({
      jobId: job.id,
      reportId: job.data.reportId,
    }));
  }
}

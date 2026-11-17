import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getJobStatus(jobId: string) {
    const job = await this.reportQueue.getJob(jobId);

    if (!job) {
      throw new NotFoundException(`Job ${jobId} not found`);
    }

    const state = await job.getState();

    return {
      jobId: job.id,
      name: job.name,
      state,
      progress: job.progress,
      attemptsMade: job.attemptsMade,
      result: state === 'completed' ? job.returnvalue : null,
      failedReason: state === 'failed' ? job.failedReason : null,
    };
  }
}

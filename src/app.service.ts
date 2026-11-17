import { InjectQueue } from '@nestjs/bullmq';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('report-queue')
    private readonly reportQueue: Queue,
  ) {}

  async createReport() {
    const reportId = 'report-123';

    const job = await this.reportQueue.add(
      'generate-report',
      {
        reportId,
        format: 'pdf',
      },
      // {
      //   delay: 30000, // 30 seconds
      // },
      {
        jobId: reportId,
      },
    );

    return {
      jobId: job.id,
      reportId,
      message: 'Report request accepted',
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

  async retryJob(jobId: string) {
    const job = await this.reportQueue.getJob(jobId);

    if (!job) {
      throw new NotFoundException(`Job ${jobId} not found`);
    }

    const state = await job.getState();

    if (state !== 'failed') {
      throw new BadRequestException(`Job ${jobId} is ${state}, not failed`);
    }

    await job.retry();

    return {
      jobId: job.id,
      message: 'Job submitted for retry',
    };
  }
}

import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('report-queue')
export class ReportProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
    console.log('START:', job.id, new Date().toISOString());

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('COMPLETED:', job.id, new Date().toISOString());
  }
}

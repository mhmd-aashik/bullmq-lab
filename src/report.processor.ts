import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('report-queue')
export class ReportProcessor extends WorkerHost {
  async process(job: Job): Promise<any> {
    console.log('Processing job:', job.id);
    console.log('Job data:', job.data);

    // Simulate PDF generation (3 seconds)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log('Report generated:', job.id);

    return {
      reportId: job.data.reportId,
      status: 'completed',
      fileUrl: `/reports/${job.data.reportId}.pdf`,
    };
  }
}

import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

// @Processor('report-queue')
// export class ReportProcessor extends WorkerHost {
//   // async process(job: Job): Promise<any> {
//   //   console.log('Processing job:', job.id);
//   //   console.log('Job data:', job.data);

//   //   // Simulate PDF generation (3 seconds)
//   //   await new Promise((resolve) => setTimeout(resolve, 3000));

//   //   console.log('Report generated:', job.id);

//   //   return {
//   //     reportId: job.data.reportId,
//   //     status: 'completed',
//   //     fileUrl: `/reports/${job.data.reportId}.pdf`,
//   //   };
//   // }

//   // async process(job: Job): Promise<any> {
//   //   console.log(`Processing job ${job.id}, attempt ${job.attemptsMade + 1}`);

//   //   throw new Error('PDF service unavailable');
//   // }

//   async process(job: Job): Promise<void> {
//     console.log({
//       jobId: job.id,
//       attempt: job.attemptsMade + 1,
//       time: new Date().toISOString(),
//     });

//     throw new Error('PDF service unavailable');
//   }
// }

@Processor('report-queue', {
  concurrency: 5,
})
export class ReportProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
    console.log(`START Job ${job.id}`, new Date().toISOString());

    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(`DONE Job ${job.id}`, new Date().toISOString());
  }
}

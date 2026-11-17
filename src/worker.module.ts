import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ReportProcessor } from './report.processor.js';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'report-queue',
    }),
  ],
  providers: [ReportProcessor],
})
export class WorkerModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
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
  controllers: [AppController],
  providers: [AppService, ReportProcessor],
})
export class AppModule {}

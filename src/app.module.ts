import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BullModule } from '@nestjs/bullmq';
import { ReportProcessor } from './report.processor.js';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';

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

    BullBoardModule.forRoot({
      route: '/admin/queues',
      adapter: ExpressAdapter,
    }),

    BullBoardModule.forFeature({
      name: 'report-queue',
      adapter: BullMQAdapter,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

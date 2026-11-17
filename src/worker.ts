import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module.js';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(WorkerModule);

  console.log('BullMQ Worker started');

  app.enableShutdownHooks();
}

bootstrap();

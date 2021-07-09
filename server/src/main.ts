import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getEnv } from './utils/env';

async function bootstrap(): Promise<void> {
  getEnv();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(5000);
}

bootstrap();

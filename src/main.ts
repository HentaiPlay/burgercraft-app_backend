import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const PORT = process.env.APP_API_PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use('/api/images', express.static(join(__dirname, '../files/images/static')));

  await app.listen(PORT);
}
bootstrap();

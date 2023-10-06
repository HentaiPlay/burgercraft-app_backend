import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const PORT = process.env.APP_API_PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use('/api/images', express.static(join(__dirname, '../files/images/static')));

  const config = new DocumentBuilder()
    .setTitle('BurgerCraftApp api')
    .setDescription('Карта api проекта BurgerCraftApp (<a href="https://github.com/HentaiPlay/burgercraft-app_backend" target="_blank">Открыть проект в github</a>)')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(PORT);
}
bootstrap();

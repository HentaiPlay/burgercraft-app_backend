import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const PORT = process.env.APP_API_PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ validateCustomDecorators: true }));
  app.use('/api/images', express.static(join(__dirname, '../files/images/static')));
  app.use('/api/audio', express.static(join(__dirname, '../files/audio')));

  // CORS
  const whitelist = [`http://${process.env.APP_HOST}`];
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ['GET', 'POST', 'PUT' ,'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

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

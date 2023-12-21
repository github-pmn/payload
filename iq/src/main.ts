import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
import { ValidationPipe } from '@nestjs/common';

const IS_DEV = process.env.NODE_ENV !== 'production';

const options = IS_DEV
  ? {}
  : {
      // httpsOptions: {
      //   key: fs.readFileSync('./secrets/private.key'),
      //   cert: fs.readFileSync('./secrets/certificate.crt'),
      // },
    };

async function bootstrap() {
  const app = await NestFactory.create(AppModule, options);
  app.setGlobalPrefix('api');
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ extended: true, limit: '100mb' }));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  await app.listen(3000);
}

bootstrap();

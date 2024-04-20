import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', 1);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:5173', 'https://softjey.github.io', 'https://junk-debug.github.io'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4000, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

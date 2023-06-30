import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, //Elimina las propiedades demas
      forbidNonWhitelisted: true, //Notifica las propiedades que estan demas
    }),
  );
  await app.listen(5000);
}
bootstrap();

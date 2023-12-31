import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }, //transforma el formato de los dt, eje string a number
      whitelist: true, //Elimina las propiedades demas
      forbidNonWhitelisted: true, //Notifica las propiedades que estan demas
    }),
  );
  await app.listen(process.env.PORT);
  console.log(`This app is running on port ${process.env.PORT}`);
}
bootstrap();

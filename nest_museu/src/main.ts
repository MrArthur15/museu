import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ROTA_VERSIONAMENTO } from './commons/constants.commons';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(ROTA_VERSIONAMENTO);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(8000);
}
void bootstrap();

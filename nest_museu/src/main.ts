import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ROTA_VERSIONAMENTO } from './commons/constants.commons';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(ROTA_VERSIONAMENTO);
  await app.listen(8000);
}
bootstrap();

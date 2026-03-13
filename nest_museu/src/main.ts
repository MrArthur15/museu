import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ROTA_VERSIONAMENTO } from './commons/constants.commons';
import { GlobalExceptionFilter } from './commons/exception/filter/global.filter';
import { UsuarioResponse } from './usuario/dto/response/usuario.response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(ROTA_VERSIONAMENTO);
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const configSwagger = new DocumentBuilder()
    .setTitle('Sistema de Gestão para Museu')
    .setDescription('API para gestão de museu')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger, {
    extraModels: [UsuarioResponse],
  });

  SwaggerModule.setup('api_museu', app, document);

  await app.listen(8000);
}
void bootstrap();

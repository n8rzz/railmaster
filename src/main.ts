import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppVersion } from './app.constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    defaultVersion: AppVersion.One,
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Railmaster API')
    .setDescription('The railmaster API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/v1/swagger', app, document);

  await app.listen(3000);
}
bootstrap();

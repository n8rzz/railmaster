import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppVersion } from './app.constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const DEFAULT_PORT = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    defaultVersion: AppVersion.One,
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Railmaster API')
    .setDescription('The railmaster API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/v1/swagger', app, document);

  await app.listen(process.env.PORT || DEFAULT_PORT);
}
bootstrap();

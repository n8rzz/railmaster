import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppVersion } from './app.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    defaultVersion: AppVersion.One,
    type: VersioningType.URI,
  });
  await app.listen(3000);
}
bootstrap();

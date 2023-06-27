import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppVersion } from './app.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    defaultVersion: AppVersion.One,
    type: VersioningType.URI,
  });
  await app.listen(3000);
}
bootstrap();

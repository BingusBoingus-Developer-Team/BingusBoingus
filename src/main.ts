import { INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const appConfig: AppConfigService = app.get(AppConfigService);

  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(app.get(Reflector));

  await app.startAllMicroservices();

  await app.listen(appConfig.appPort);
}

bootstrap();

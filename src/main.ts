import { INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';
import { ErrorFilter } from './common/filters/error.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const appConfig: AppConfigService = app.get(AppConfigService);

  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(app.get(Reflector));
  bootstrapSwagger(app, appConfig);
  await app.startAllMicroservices();

  await app.listen(appConfig.appPort);
}

async function bootstrapSwagger(
  app: INestApplication,
  appConfig: AppConfigService,
) {

  const config = new DocumentBuilder()
    .setTitle('BingusBoingus API')
    .setDescription('BingusBoingus REST API Documentation')
    .setVersion('1.0').setBasePath('api/v1')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,

  });

  SwaggerModule.setup('api/v1/doc', app, document, {
    customSiteTitle: 'API Docs',
    explorer: true,
  } as unknown as any);
}


bootstrap();

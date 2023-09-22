import { Reflector } from '@nestjs/core';
import { NestFactory } from '@nestjs/core';
import { DeployModule } from './deploy.module';

async function bootstrap() {
  const app = await NestFactory.create(DeployModule, {
    cors: true,
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(app.get(Reflector));

  await app.startAllMicroservices();

  await app.listen(3000);
}

bootstrap();

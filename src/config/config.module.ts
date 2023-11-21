import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { AppConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default('MyApp'),
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_URL: Joi.string().default('http://my-app.test'),
        APP_PORT: Joi.number().default(3000),
        MONGO_URI: Joi.string().default('localhost'),
        MONGO_PORT: Joi.number().default(3306),
        MONGO_USERNAME: Joi.string(),
        MONGO_PASSWORD: Joi.string(),
        MONGO_DATABASE: Joi.string().default('nestjs'),
        MONGO_RUN_MIGRATION: Joi.boolean().default(false),
        MONGO_ENTITIES: Joi.string().default('dist/**/*.entity.*{ts,js}'),
        MONGO_RUN_SYNCHRONIZE: Joi.boolean().default(false),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    if (this.username && this.password) {
      return {
        uri: `mongodb://${this.username}:${this.password}@${this.uri}`,
      };
    } else {
      return { uri: this.uri };
    }
  }

  get uri(): string {
    return this.configService.get<string>('mongo.uri');
  }
  get port(): number {
    return Number(this.configService.get<number>('mongo.port'));
  }
  get username(): string {
    return this.configService.get<string>('mongo.username');
  }
  get password(): string {
    return this.configService.get<string>('mongo.password');
  }
  get database(): string {
    return this.configService.get<string>('mongo.database');
  }
  get migrationsRun(): boolean {
    return JSON.parse(this.configService.get<string>('mongo.migrationsRun'));
  }
  get synchronizeRun(): boolean {
    return JSON.parse(this.configService.get<string>('mongo.synchronizeRun'));
  }
  get entities(): string {
    return this.configService.get<string>('mongo.entities');
  }
}

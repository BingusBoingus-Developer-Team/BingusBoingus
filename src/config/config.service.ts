import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get appPort(): number {
    return Number(this.configService.get<number>('app.port'));
  }
  get botToken(): string {
    return this.configService.get<string>('app.botToken');
  }
  get publicKey(): string {
    return this.configService.get<string>('app.publicKey');
  }
  get clientId(): number {
    return Number(this.configService.get<number>('app.clientId'));
  }
  get serverId(): number {
    return Number(this.configService.get<number>('app.serverId'));
  }
}

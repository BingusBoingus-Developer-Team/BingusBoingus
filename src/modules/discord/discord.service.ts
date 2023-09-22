import { Injectable } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';
import { AppConfigService } from '../../config/config.service';

@Injectable()
export class DiscordService {
  public readonly client: Client<boolean>;

  constructor(configService: AppConfigService) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.client.login(configService.botToken);
  }
}

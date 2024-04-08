import { Injectable } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';
import { AppConfigService } from '../../config/config.service';
import { CronScheduler } from '../cron-tasks/cron-scheduler';
import { BirthdayEntryService } from '../birthday/service/birthday-entry.service';

@Injectable()
export class DiscordService {
  public readonly client: Client<boolean>;
  public cronScheduler: CronScheduler;

  constructor(configService: AppConfigService, private readonly birthdayService: BirthdayEntryService) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.client.login(configService.botToken);
    this.client.on('ready', () => {
      this.cronScheduler = new CronScheduler(this.client, birthdayService);
      this.cronScheduler.registerTasks();
    });
  }
}

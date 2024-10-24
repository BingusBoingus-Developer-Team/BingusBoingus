import { Module } from '@nestjs/common';
import { BirthdayEntryModule } from '../models/birthday/module/birthday-entry.module';
import { CronService } from './cron.service';
import { DiscordModule } from '../discord/discord.module';
import { ServerConfigModule } from '../models/config/module/server-config.module';

@Module({
  imports: [DiscordModule, BirthdayEntryModule, ServerConfigModule],
  providers: [CronService],
  exports: [CronService],
})
export class TaskModule {}

import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { AppConfigModule } from '../../config/config.module';
import { BirthdayEntryModule } from '../birthday/module/birthday-entry.module';

@Module({
  imports: [AppConfigModule, BirthdayEntryModule],
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}

import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { AppConfigModule } from '../../config/config.module';

@Module({
  imports: [AppConfigModule],
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}

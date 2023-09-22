import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { DiscordModule } from './modules/discord/discord.module';
import { CommandModule } from './modules/command/command.module';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [AppConfigModule, DiscordModule, CommandModule, EventModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { ClientReady } from './services/clientReady';
import { Interaction } from './services/interaction';
import { MessageEvent } from './services/messageEvent';
import { DiscordModule } from '../discord/discord.module';
import { CommandModule } from '../command/command.module';
import { PollModule } from '../poll/module/poll.module';

@Module({
  imports: [DiscordModule, CommandModule, PollModule],
  providers: [EventService, ClientReady, Interaction, MessageEvent],
  exports: [EventService],
})
export class EventModule {}

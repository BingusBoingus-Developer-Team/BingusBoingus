import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { ClientReady } from './services/clientReady';
import { Interaction } from './services/interaction';
import { MessageEvent } from './services/messageEvent';
import { DiscordModule } from '../discord/discord.module';
import { CommandModule } from '../command/command.module';
import { PollModule } from '../models/poll/module/poll.module';
import { TaskModule } from '../cron-tasks/task.module';

@Module({
  imports: [DiscordModule, TaskModule, CommandModule, PollModule],
  providers: [EventService, ClientReady, Interaction, MessageEvent],
  exports: [EventService],
})
export class EventModule {}

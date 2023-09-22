import { Injectable } from '@nestjs/common';
import { Collection } from 'discord.js';
import { AEvent } from './event.abstract';
import { ClientReady } from './services/clientReady';
import { Interaction } from './services/interaction';
import { MessageEvent } from './services/messageEvent';
import { DiscordService } from '../discord/discord.service';

@Injectable()
export class EventService {
  constructor(
    clientReady: ClientReady,
    interaction: Interaction,
    message: MessageEvent,
    discordService: DiscordService,
  ) {
    const events: AEvent[] = [clientReady, interaction, message];
    events.forEach((event) => {
      console.log('register new event: ' + event.event);
      (discordService.client as any)[event.once ? 'once' : 'on'](
        event.event,
        (args: unknown[]) => event.execute(args),
      );
    });
  }
}

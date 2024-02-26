import { Injectable } from '@nestjs/common';
import { ClientEvents, Collection, Events } from 'discord.js';
import { AEvent, EventKey } from './event.abstract';
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
      if (event.once) {
        discordService.client.once(
          event.event,
          (...args: ClientEvents[EventKey]) => event.execute(args),
        );
      } else {
        discordService.client.on(
          event.event,
          (...args: ClientEvents[EventKey]) => event.execute(args),
        );
      }
    });
  }
}

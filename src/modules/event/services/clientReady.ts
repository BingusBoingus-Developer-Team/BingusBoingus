import { Injectable } from '@nestjs/common';
import { ClientEvents, Events } from 'discord.js';
import { AEvent } from '../event.abstract';

@Injectable()
export class ClientReady extends AEvent {
  event: keyof ClientEvents = Events.ClientReady;
  once: boolean = true;

  async execute(args: ClientEvents[Events.ClientReady]) {
    console.log('Successfully connected to Discord');
    console.log(`logged in as ${args[0].user.username}`);
  }
}

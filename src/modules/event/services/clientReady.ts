import { Injectable } from '@nestjs/common';
import { ClientEvents, Events } from 'discord.js';
import { AEvent } from '../event.abstract';

@Injectable()
export class ClientReady extends AEvent {
  event: keyof ClientEvents = Events.ClientReady;
  once: boolean = true;

  async execute(c) {
      console.log('Successfully connected to Discord');
      console.log(`logged in as ${c.user?.username}`);
  }
}

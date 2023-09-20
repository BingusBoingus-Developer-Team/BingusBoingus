import { Events } from 'discord.js';
import { AEvent } from '../event.abstract';

export class ClientReady extends AEvent {
  event: Events = Events.ClientReady;
  once: boolean = true;

  async execute(c) {
    return this.run(() => {
      console.log('Successfully connected to Discord');
      console.log(`logged in as ${c.user.tag}`);
    });
  }
}

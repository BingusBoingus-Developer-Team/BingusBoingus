import { Events } from 'discord.js';
import { AEvent } from '../event.abstract';

export class Interaction extends AEvent {
  event: Events = Events.InteractionCreate;
  once: boolean = false;

  async execute(interaction) {
    return this.run(() => {
      console.log('new interaction');
      console.log(interaction);
    });
  }
}

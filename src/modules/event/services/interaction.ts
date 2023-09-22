import { Events } from 'discord.js';
import { AEvent } from '../event.abstract';

export class Interaction extends AEvent {
  event: Events = Events.InteractionCreate;
  once: boolean = false;

  async execute(interaction) {
    return this.run(() => {
      console.log('new interaction');
      console.log(interaction);
      if (!interaction.isCommand()) {
        return;
      }
      // const { commandName } = interaction;
      // var command = getCommand(commandName);
      // command?.execute(interaction);
    });
  }
}

import { Events } from 'discord.js';
import { AEvent } from '../event.abstract';
import { CommandModule } from '../../command/command.module';

export class Interaction extends AEvent {
  event: Events = Events.InteractionCreate;
  once: boolean = false;
  private commandModule: CommandModule;

  constructor(commandModule: CommandModule) {
    super();
    this.commandModule = commandModule;
  }

  async execute(interaction: any) {
    return this.run(() => {
      console.log('hello');
      if (!interaction.isCommand()) {
        return;
      }
      const { commandName } = interaction;
      var command = this.commandModule.getCommand(commandName);
      command?.execute(interaction);
    });
  }
}

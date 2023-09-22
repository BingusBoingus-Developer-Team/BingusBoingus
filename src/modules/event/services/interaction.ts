import { Events } from 'discord.js';
import { AEvent } from '../event.abstract';
import { CommandService } from '../../command/command.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class Interaction extends AEvent {
  event: Events = Events.InteractionCreate;
  once: boolean = false;

  constructor(private readonly commandService: CommandService) {
    super();
  }

  async execute(interaction: any) {
    return this.run(() => {
      if (!interaction.isCommand()) {
        return;
      }
      const { commandName } = interaction;
      var command = this.commandService.getCommand(commandName);
      command?.execute(interaction);
    });
  }
}

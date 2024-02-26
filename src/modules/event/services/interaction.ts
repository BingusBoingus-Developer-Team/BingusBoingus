import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CacheType,
  ClientEvents,
  EmbedBuilder,
  Events,
  Message,
} from 'discord.js';
import { AEvent } from '../event.abstract';
import { CommandService } from '../../command/command.service';
import { Inject, Injectable } from '@nestjs/common';
import { PollService } from 'src/modules/poll/service/poll.service';

@Injectable()
export class Interaction extends AEvent {
  event: keyof ClientEvents = Events.InteractionCreate;
  once: boolean = false;

  constructor(
    private readonly commandService: CommandService,
    private readonly pollService: PollService,
  ) {
    super();
  }

  async execute(args: ClientEvents[Events.InteractionCreate]): Promise<void> {
    const interaction = args[0];
    if (interaction.isCommand()) {
      const { commandName } = interaction;
      var command = this.commandService.getCommand(commandName);
      command?.execute(interaction);
    } else if (interaction.isButton()) {
      if (interaction?.customId === 'up') {
        await this.pollService.upVote(interaction);
      } else if (interaction?.customId === 'down') {
        await this.pollService.downVote(interaction);
      } else if (interaction?.customId === 'close') {
        await this.pollService.closePoll(interaction);
      }
    }
  }
}

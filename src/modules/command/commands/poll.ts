import { Inject, Injectable } from '@nestjs/common';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CacheType,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { ACommand } from '../command.abstract';
import { PollService } from '../../models/poll/service/poll.service';

@Injectable()
export class PollCommand extends ACommand {
  constructor(
    @Inject(PollService)
    private readonly pollService: PollService,
  ) {
    super();
  }
  data = new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Start a poll in your channel!')
    .addStringOption((option) =>
      option
        .setName('topic')
        .setDescription('the topic of your poll')
        .setMinLength(5)
        .setMaxLength(200)
        .setRequired(true),
    );

  public execute(arg: CommandInteraction<CacheType>): Promise<boolean> {
    return this.run(async () => {
      this.pollService.create(arg);
      return true;
    });
  }
}

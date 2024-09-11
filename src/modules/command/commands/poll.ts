import { Inject, Injectable } from '@nestjs/common';
import { CacheType, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ACommand } from '../command.abstract';
import { PollService } from '../../models/poll/service/poll.service';
import {
  CommandAccessLevel,
  Role,
} from '../../../common/decoratos/role.decorator';

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

  // @Role(CommandAccessLevel.member)
  public execute(arg: CommandInteraction<CacheType>): Promise<boolean> {
    return this.run(async () => {
      this.pollService.create(arg);
      return true;
    });
  }
}

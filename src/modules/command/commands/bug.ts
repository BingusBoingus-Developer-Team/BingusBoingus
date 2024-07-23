import { Injectable } from '@nestjs/common';
import { SlashCommandBuilder } from 'discord.js';
import { ACommand } from '../command.abstract';
import {
  CommandAccessLevel,
  Role,
} from '../../../common/decoratos/role.decorator';

@Injectable()
export class BugReport extends ACommand {
  data = new SlashCommandBuilder()
    .setName('bug')
    .setDescription('report a bug to my maintainers!');

  @Role(CommandAccessLevel.member)
  async execute(interaction) {
    return this.run(async () => {
      await interaction.reply(
        'If you found a bug please open an Issue -->  https://github.com/Blvckleg/BingusBoingus/issues',
      );
    });
  }
}

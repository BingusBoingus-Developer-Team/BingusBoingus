import { Injectable } from '@nestjs/common';
import { SlashCommandBuilder } from 'discord.js';
import { ACommand } from '../command.abstract';
import {
  CommandAccessLevel,
  Role,
} from '../../../common/decoratos/role.decorator';

@Injectable()
export class ReportedCommand extends ACommand {
  data = new SlashCommandBuilder()
    .setName('reported')
    .setDescription('swag reports someone');

  @Role(CommandAccessLevel.member)
  public execute(arg: any /*Interaction<CacheType>*/): Promise<boolean> {
    return this.run(async () => {
      await arg.reply({
        files: ['src/assets/reported.gif'],
      });
    });
  }
}

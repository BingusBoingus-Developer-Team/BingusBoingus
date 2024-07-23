import { Injectable } from '@nestjs/common';
import { SlashCommandBuilder } from 'discord.js';
import { ACommand } from '../command.abstract';
import {
  CommandAccessLevel,
  Role,
} from '../../../common/decoratos/role.decorator';

@Injectable()
export class PingPongCommand extends ACommand {
  data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

  @Role(CommandAccessLevel.Developer)
  public execute(arg: any /*Interaction<CacheType>*/): Promise<boolean> {
    return this.run(async () => {
      await arg.reply('Pong!');
    });
  }
}

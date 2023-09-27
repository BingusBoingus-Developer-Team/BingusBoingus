import { Injectable } from '@nestjs/common';
import { SlashCommandBuilder } from 'discord.js';
import { ACommand } from '../command.abstract';

@Injectable()
export class GoldCommand extends ACommand {
  data = new SlashCommandBuilder().setName('gold').setDescription('schweigen ist gold!');

  public execute(arg: any /*Interaction<CacheType>*/): Promise<boolean> {
    return this.run(async () => {
      await arg.reply({
        files: ['src/assets/image.png'],
      });
    });
  }
}

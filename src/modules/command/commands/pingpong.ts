import { Injectable } from '@nestjs/common';
import { SlashCommandBuilder } from 'discord.js';
import { ACommand } from '../command.abstract';

@Injectable()
export class PingPongCommand extends ACommand {
  data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

  public execute(arg: any /*Interaction<CacheType>*/): Promise<boolean> {
    return this.run(async () => {
      await arg.reply('Pong!');
    });
  }
}

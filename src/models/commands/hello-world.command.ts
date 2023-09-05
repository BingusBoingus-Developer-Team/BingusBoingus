import { CommandInteraction, CacheType } from 'discord.js';
import { ICommand } from '../../interfaces/ICommand';

export default class HelloWorldCommand implements ICommand {
  async execute(interaction: CommandInteraction<CacheType>): Promise<boolean> {
    try {
      await interaction.reply('Hello World!');
      return true;
    } catch (e: any) {
      return false;
    }
  }
}

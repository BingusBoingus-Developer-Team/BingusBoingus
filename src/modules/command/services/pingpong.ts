import { SlashCommandBuilder } from 'discord.js';
import { ACommand } from '../command.abstract';

class PingPongModule extends ACommand {
  data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

  async execute(interaction): Promise<boolean> {
    return this.run(async () => {
      await interaction.reply('Pong!');
    });
  }
}

export { PingPongModule };

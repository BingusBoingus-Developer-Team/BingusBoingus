import { SlashCommandBuilder } from 'discord.js';
import { ACommand } from '../command.abstract';

class HelloModule extends ACommand {
  data = new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Hello World!');

  async execute(interaction) {
    return this.run(async () => {
      await interaction.reply('moin!');
    });
  }
}

export { HelloModule };

import { SlashCommandBuilder } from 'discord.js';
import { CommandModule } from '../command/CommandModule';

class HelloModule extends CommandModule {
  data = new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Hello World!');

  async execute(interaction) {
    return this.runCommand(async () => {
      await interaction.reply('moin!');
    });
  }
}

export { HelloModule };

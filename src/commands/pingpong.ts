import { CacheType, Interaction, SlashCommandBuilder } from 'discord.js';
import { CommandModule } from '../command/CommandModule';

class PingPongModule extends CommandModule {
  data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

  async execute(interaction): Promise<boolean> {
    return this.runCommand(async () => {
      await interaction.reply('Pong!');
    });
  }
}

export { PingPongModule };

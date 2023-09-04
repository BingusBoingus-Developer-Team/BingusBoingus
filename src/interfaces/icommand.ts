import { CommandInteraction } from 'discord.js';

export interface ICommand {
  execute(interaction: CommandInteraction): Promise<boolean>;
}

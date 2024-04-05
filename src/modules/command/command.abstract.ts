import {
  CacheType,
  CommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

export abstract class ACommand {
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

  public abstract execute(arg: CommandInteraction<CacheType>): Promise<boolean>;

  protected async run(command: () => any): Promise<boolean> {
    try {
      await command();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

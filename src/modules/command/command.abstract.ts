import {
  CacheType,
  CommandInteraction,
  Interaction,
  SlashCommandBuilder,
} from 'discord.js';

export abstract class ACommand {
  data: SlashCommandBuilder;

  public abstract execute(
    arg: Interaction<CacheType> | CommandInteraction<CacheType>,
  ): Promise<boolean>;

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

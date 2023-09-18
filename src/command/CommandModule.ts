import { CacheType, Interaction, SlashCommandBuilder } from 'discord.js';

export abstract class CommandModule {
  data: SlashCommandBuilder;

  public abstract execute(
    interaction: Interaction<CacheType>,
  ): Promise<boolean>;

  protected async runCommand(command: () => Promise<any>): Promise<boolean> {
    try {
      await command();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public valid(): boolean {
    if (this.data && this.data.name && this.execute) {
      console.log('command-name: ' + this.data.name);
      return true;
    } else {
      console.error("couldn't read command:");
      console.error(this);
      return false;
    }
  }
}

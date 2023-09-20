import { CacheType, Interaction } from 'discord.js';

export abstract class ACollectionEntry {
  abstract readonly data: { name: string };

  public valid(): boolean {
    if (this.data && this.data.name) {
      console.log('command-name: ' + this.data.name);
      return true;
    } else {
      console.error("couldn't read command:");
      console.error(this);
      return false;
    }
  }

  public abstract execute(
    interaction: Interaction<CacheType>,
  ): Promise<boolean>;
}

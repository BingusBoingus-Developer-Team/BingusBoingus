import { CacheType, Interaction, SlashCommandBuilder } from 'discord.js';
import { ACollectionEntry } from '../../helpers/abstract/collectionEntry.abstract';

export abstract class ACommand extends ACollectionEntry<
  Interaction<CacheType>
> {
  data: SlashCommandBuilder;
  name(): string {
    return this.data.name;
  }
}

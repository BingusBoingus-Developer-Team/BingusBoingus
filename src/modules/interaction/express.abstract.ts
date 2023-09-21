import { Events } from 'discord.js';
import { ACollectionEntry } from '../../helpers/abstract/collectionEntry.abstract';

export abstract class AExpress extends ACollectionEntry<any> {
  abstract readonly event: Events;
  abstract readonly once: boolean;
  name(): string {
    return this.event;
  }
}

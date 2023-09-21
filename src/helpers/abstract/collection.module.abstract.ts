import { ACollectionEntry } from './collectionEntry.abstract';

export abstract class ACollectionModule<U, T extends ACollectionEntry<U>> {
  public modulesList: T[] = [];
  public modulesCollection = new Map<string, T>();

  constructor(modules: T[]) {
    modules.forEach((command) => {
      if (command.valid) {
        this.modulesList.push(command);
        this.modulesCollection.set(command.name(), command);
      }
    });
  }

  getCommand(commandName: string): T {
    if (this.modulesCollection.has(commandName)) {
      return this.modulesCollection.get(commandName);
    }
    return null;
  }
}

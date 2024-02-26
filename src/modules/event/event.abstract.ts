import { ClientEvents } from 'discord.js';

export type EventKey =  keyof ClientEvents;

export abstract class AEvent {
  abstract readonly event: EventKey;
  abstract readonly once: boolean;

  public abstract execute(args: ClientEvents[EventKey]): Promise<void>;

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

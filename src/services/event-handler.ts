import { InteractionType, Message } from 'discord.js';
import { responseList } from '../interfaces/iresponse';

export class EventListener {
  // Your Discord client should be passed as a parameter to the constructor
  constructor(private client: import('discord.js').Client) {}

  // Add your event listener method
  public startListening(): void {
    this.client.on('message', this.onMessage);
  }

  private onMessage = async (message: Message<boolean>): Promise<void> => {
    const { content, channel, author } = message;
    if (author.bot) return;

    responseList.forEach((res) => {
      if (res.matcher.test(content)) {
        channel.send(res.response);
      }
    });
  };
}

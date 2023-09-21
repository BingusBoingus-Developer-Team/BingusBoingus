import { Events, Message } from 'discord.js';
import { AEvent } from '../event.abstract';
import { IResponse } from '../interfaces/iresponse';

export class MessageEvent extends AEvent {
  event: Events = Events.MessageCreate; // ShardEvents.Message;
  once: boolean = false;

  private responseList: Array<IResponse> = [
    {
      matcher: /wag1/i,
      response: 'wagwan2',
    },
    {
      matcher: /^.{150,}$/,
      response: 'halbe Bibel, ganzer huansohn ?XD',
    },
    {
      matcher: /http:\/\/.*/,
      response: 'send yo virus link to someone else no?xd',
    },
  ];

  async execute(message: Message<boolean>) {
    return this.run(() => {
      const { content, channel, author } = message;
      if (author.bot) return;

      this.responseList.forEach((res) => {
        var testRes = res.matcher.test(content);
        if (testRes) {
          message.reply(res.response);
          // channel.send(res.response);
        }
      });
    });
  }
}

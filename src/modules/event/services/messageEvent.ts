import { Injectable } from '@nestjs/common';
import { Events, Message } from 'discord.js';
import { AEvent } from '../event.abstract';
import { IResponse } from '../interfaces/iresponse';
@Injectable()
export class MessageEvent extends AEvent {
  event: Events = Events.MessageCreate; // ShardEvents.Message;
  once: boolean = false;

  private responseList: Array<IResponse> = [
    {
      matcher: /wag1/i,
      response: 'wagwan2',
    },
    {
      matcher: /^.{150,}$/m,
      response: 'halbe Bibel, ganzer huansohn ?XD',
    },
    {
      matcher: /https:\/\/.*/,
      response: 'send yo virus link to someone else no?xd',
    },
    {
      matcher: /wadim/i,
      response: '#goth',
    },
    {
      matcher: /digga/i,
      response: 'digga mich nicht',
    },
    {
      matcher: /alina/i,
      response: 'Schuhgröße 36, weißer Nagellack 🥵',
    },
    {
      matcher: /monke/i,
      response: '🐒 🦧',
    },
    {
      matcher: /hego/i,
      response: { files: ['src/assets/textbox-donowall.gif'] },
    },
  ];

  async execute(message: any /*Message<boolean>*/) {
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

import { Injectable } from '@nestjs/common';
import { Events } from 'discord.js';
import { AEvent } from '../event.abstract';
import { IResponse, ResponseType } from '../interfaces/iresponse';
@Injectable()
export class MessageEvent extends AEvent {
  event: Events = Events.MessageCreate; // ShardEvents.Message;
  once: boolean = false;

  private responseList: Array<IResponse> = [
    {
      matcher: /wag1/i,
      response: 'wagwan2',
      responseType: ResponseType.Reply,
    },
    {
      matcher: /^.{150,}$/m,
      response: 'halbe Bibel, ganzer huansohn ?XD',
      responseType: ResponseType.Reply,
    },
    {
      matcher: /https:\/\/.*/,
      response: 'send yo virus link to someone else no?xd',
      responseType: ResponseType.Reply,
    },
    {
      matcher: /wadim/i,
      response: '#goth',
      responseType: ResponseType.Message,
    },
    {
      matcher: /digga/i,
      response: 'digga mich nicht',
      responseType: ResponseType.Reply,
    },
    {
      matcher: /alina/i,
      response: 'Schuhgröße 36, weißer Nagellack 🥵',
      responseType: ResponseType.Message,
    },
    {
      matcher: /monke/i,
      response: '🐒 🦧',
      responseType: ResponseType.Message,
    },
    {
      matcher: /hego/i,
      response: { files: ['src/assets/textbox-donowall.gif'] },
      responseType: ResponseType.Reply,
    },
    {
      matcher: /bingus/i,
      response: { files: ['src/assets/bingus.png'] },
      responseType: ResponseType.Message,
    },
    {
      matcher: /spoingus/i,
      response: { files: ['src/assets/spoingus.png'] },
      responseType: ResponseType.Message,
    },
  ];

  async execute(message: any /*Message<boolean>*/) {
    return this.run(() => {
      const { content, channel, author } = message;
      if (author.bot) return;

      this.responseList.forEach((res) => {
        var testRes = res.matcher.test(content);
        if (testRes) {
          if (res?.responseType == ResponseType.Reply) {
            message.reply(res.response);
          } else {
            channel.send(res.response);
          }
        }
      });
    });
  }
}

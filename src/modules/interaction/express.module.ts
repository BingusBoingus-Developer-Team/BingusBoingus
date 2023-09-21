import { ACollectionModule } from '../../helpers/abstract/collection.module.abstract';
import { Utils } from '../../helpers/utils';
import { AExpress } from './express.abstract';

import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { Express, Request, Response } from 'express-serve-static-core';
const express = require('express');
const app: Express = express();

export class ExpressModule extends ACollectionModule<any, AExpress> {
  constructor() {
    const moduleList: AExpress[] = [];

    super(moduleList);
  }

  init(port: number | string) {
    app.use(
      express.json({
        verify: Utils.verifyDiscordRequest(process.env.PUBLIC_KEY),
      }),
    );

    app.listen(port, () => {
      console.log('Listening on port', port);
    });

    app.post(
      '/interactions',
      verifyKeyMiddleware(process.env.APP_PUBLIC_KEY),
      (req: Request, res: Response) => {
        const { type, data } = req.body;

        /**
         * Handle verification requests
         */
        if (type === InteractionType.PING) {
          return res.send({ type: InteractionResponseType.PONG });
        }

        if (type === InteractionType.APPLICATION_COMMAND) {
          const { name } = data;
          switch (name) {
            case 'test':
              // Send a message into the channel where command was triggered from
              return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                  content: 'hello world ' + Utils.getRandomEmoji(),
                },
              });
            default:
              return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                  content: 'Hello world',
                },
              });
          }
        }
      },
    );
  }
}

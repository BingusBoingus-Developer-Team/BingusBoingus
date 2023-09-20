import {
  Client,
  Events,
  GatewayIntentBits,
  InteractionResponseType,
  InteractionType,
} from 'discord.js';
import { config } from 'dotenv';
import { CommandModule } from './command/command.module';
import { Utils } from './helpers/utils';
import { verifyKeyMiddleware } from 'discord-interactions';
import { Express, Request, Response } from 'express-serve-static-core';
import { EventModule } from './event/event.module';
const express = require('express');
const app: Express = express();

function main(args: string[]) {
  config();
  const port = process.env.APP_PORT || 3000;

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  initCommands(client);
  initEvents(client);
  initExpress(app, port);

  client.login(process.env.BOT_TOKEN);
}

function initCommands(client: Client) {
  var commandColModule = new CommandModule();
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) {
      return;
    }
    const { commandName } = interaction;
    var command = commandColModule.getCommand(commandName);
    command?.execute(interaction);
  });
}

function initEvents(client) {
  var eventModule = new EventModule();
  eventModule.modulesList.forEach((event) => {
    if (event.once) {
      client.once(event.event, (args) => event.execute(args));
    } else {
      client.on(event.event, (args) => event.execute(args));
    }
  });
}

function initExpress(app, port: number | string) {
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
      if (type === InteractionType.Ping) {
        return res.send({ type: InteractionResponseType.Pong });
      }

      if (type === InteractionType.ApplicationCommand) {
        const { name } = data;
        switch (name) {
          case 'test':
            // Send a message into the channel where command was triggered from
            return res.send({
              type: InteractionResponseType.ChannelMessageWithSource,
              data: {
                content: 'hello world ' + Utils.getRandomEmoji(),
              },
            });
          default:
            return res.send({
              type: InteractionResponseType.ChannelMessageWithSource,
              data: {
                content: 'Hello world',
              },
            });
        }
      }
    },
  );
}

main(process.argv.slice(2));

import { Client, Events, GatewayIntentBits, InteractionResponseType, InteractionType } from 'discord.js';
import { config } from 'dotenv';
import { CommandCollectionModule } from './command/commandCollection';
import { EventListener } from './services/event-handler';
import { VerifyDiscordRequest, getRandomEmoji } from './helpers/utils';
const express = require('express');
const app = express();

function main(args: string[]) {
  config();

  const port = process.env.APP_PORT || 3000;
  app.use(
    express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) })
  );
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  var commandColModule = new CommandCollectionModule();

  client.once(Events.ClientReady, (c) => {
    console.log('Successfully connected to Discord');
    console.log(`logged in as ${c.user.tag}`);
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) {
      return;
    }
    const { commandName } = interaction;
    var command = commandColModule.getCommand(commandName);
    command?.execute(interaction);
  });
  app.post('/interactions', async function (req, res) {
    // Interaction type and data
    const { type, id, data } = req.body;

    /**
     * Handle verification requests
     */
    if (type === InteractionType.Ping) {
      return res.send({ type: InteractionResponseType.Pong });
    }

    if (type === InteractionType.ApplicationCommand) {
      const { name } = data;

      // "test" command
      if (name === 'test') {
        // Send a message into the channel where command was triggered from
        return res.send({
          type: InteractionResponseType.ChannelMessageWithSource,
          data: {
            content: 'hello world ' + getRandomEmoji(),
          },
        });
      }
    }
  });
  app.listen(port, () => {
    console.log('Listening on port', port);
  });

  const autoReply = new EventListener(client);
  autoReply.startListening();
  client.login(process.env.BOT_TOKEN);
}

main(process.argv.slice(2));

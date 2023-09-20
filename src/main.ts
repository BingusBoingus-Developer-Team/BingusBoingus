import {
  Client,
  Events,
  GatewayIntentBits,
  InteractionResponseType,
  InteractionType,
} from 'discord.js';
import { config } from 'dotenv';
import { CommandModule } from './modules/command/command.module';
import { EventModule } from './modules/event/event.module';
import { ExpressModule } from './modules/interaction/express.module';

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

  new CommandModule();
  new EventModule().init(client);
  new ExpressModule().init(port);

  client.login(process.env.BOT_TOKEN);
}

main(process.argv.slice(2));

import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import commandRepository from './models/command-repository';

function main(args: string[]) {
  dotenv.config();

  const app = new Client({
    intents: [GatewayIntentBits.Guilds],
  });
  app.once('ready', () => {
    console.log('Successfully connected to Discord');
  });
  app.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
      return;
    }
    const { commandName } = interaction;
    commandRepository.getCommandByName(commandName)?.execute(interaction);
  });
  app.login(process.env.DISCORD_TOKEN);
}

main(process.argv);

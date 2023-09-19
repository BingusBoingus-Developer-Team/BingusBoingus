import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { CommandCollectionModule } from './command/commandCollection';

function main(args: string[]) {
  config();
  const app = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  var commandColModule = new CommandCollectionModule();

  app.once(Events.ClientReady, (c) => {
    console.log('Successfully connected to Discord');
    console.log(`logged in as ${c.user.tag}`);
  });

  app.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) {
      return;
    }
    const { commandName } = interaction;
    var command = commandColModule.getCommand(commandName);
    command?.execute(interaction);
  });
  app.login(process.env.BOT_TOKEN);
}

main(process.argv.slice(2));

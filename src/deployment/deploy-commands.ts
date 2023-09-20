import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from 'discord.js';
import { CommandModule } from '../command/command.module';

function loadCommands(): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
  var commands = new CommandModule().modulesList;
  return commands.map((command) => command.data.toJSON());
}

const commands = loadCommands();

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.BOT_TOKEN);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.SERVER_ID,
      ),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();

import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from 'discord.js';
import { Injectable } from '@nestjs/common';
import { CommandService } from '../modules/command/command.service';

@Injectable()
export class DeployServcice {
  constructor(private readonly commandService: CommandService) {
    this.deployCommands();
  }

  loadCommands(): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
    var commands = this.commandService.getAllCommands();
    return commands.map((command) => command.data.toJSON());
  }

  deployCommands() {
    const commands = this.loadCommands();

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
  }
}

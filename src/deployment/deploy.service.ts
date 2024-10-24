import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from 'discord.js';
import { Injectable } from '@nestjs/common';
import { CommandService } from '../modules/command/command.service';
import { AppConfigService } from '../config/config.service';

@Injectable()
export class DeployServcice {
  constructor(
    private readonly commandService: CommandService,
    private readonly configService: AppConfigService,
  ) {
    const commands = this.loadCommands();
    this.deployCommands(commands);
  }

  loadCommands(): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
    const commands = this.commandService.getAllCommands();
    return commands.map((command) => command.data.toJSON());
  }

  async deployCommands(
    commands: RESTPostAPIChatInputApplicationCommandsJSONBody[],
  ) {
    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(this.configService.botToken);

    // and deploy your commands!
    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands.`,
      );

      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID ?? ''),
        {
          body: commands,
        },
      );

      let log = '';
      if (Array.isArray(data)) log = data.length + ' ';
      console.log(`Successfully reloaded ${log}application (/) commands.`);
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  }
}

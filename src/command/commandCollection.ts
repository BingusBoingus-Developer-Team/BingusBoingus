import { CommandModule } from './CommandModule';
import { PingPongModule } from '../commands/pingpong';
import { HelloModule } from '../commands/hello';

class CommandCollectionModule {
  public moduleList: CommandModule[] = [
    new PingPongModule(),
    new HelloModule(),
  ];

  public commandCollection = new Map<string, CommandModule>();

  constructor() {
    var commands: CommandModule[] = [];
    this.moduleList.forEach((command) => {
      if (command.valid) {
        commands.push(command);
        this.commandCollection.set(command.data.name, command);
      }
    });
    this.moduleList = commands;
  }

  getCommand(commandName: string): CommandModule {
    if (this.commandCollection.has(commandName)) {
      return this.commandCollection.get(commandName);
    }
    return null;
  }
}

export { CommandCollectionModule };

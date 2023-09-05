import { ICommand } from '../interfaces/icommand';
import HelloWorldCommand from './commands/hello-world.command';

class CommandEntity {
  name: string;
  command: ICommand;
}

export const commandEntities: CommandEntity[] = [
  {
    name: 'Hello',
    command: new HelloWorldCommand(),
  },
];

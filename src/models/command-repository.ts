import { ICommand } from '../interfaces/ICommand';
import { commandEntities } from './command-entity';

class CommandRepository {
  getCommandByName(name: string): ICommand | null {
    return commandEntities.find((cmd) => cmd.name === name)?.command;
  }
}
export default new CommandRepository();

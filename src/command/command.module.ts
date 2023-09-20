import { ACommand } from './command.abstract';
import { PingPongModule } from './commands/pingpong';
import { HelloModule } from './commands/hello';
import { ACollectionModule } from '../helpers/abstract/collection.module.abstract';
import { CacheType, Interaction } from 'discord.js';

export class CommandModule extends ACollectionModule<
  Interaction<CacheType>,
  ACommand
> {
  constructor() {
    const moduleList: ACommand[] = [new PingPongModule(), new HelloModule()];

    super(moduleList);
  }
}

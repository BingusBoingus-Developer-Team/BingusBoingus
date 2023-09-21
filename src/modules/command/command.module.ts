import { ACommand } from './command.abstract';
import { HelloModule } from './services/hello';
import { ACollectionModule } from '../../helpers/abstract/collection.module.abstract';
import { CacheType, Interaction } from 'discord.js';
import { PingPongModule } from './services/pingpong';

export class CommandModule extends ACollectionModule<
  Interaction<CacheType>,
  ACommand
> {
  constructor() {
    const moduleList: ACommand[] = [new PingPongModule(), new HelloModule()];

    super(moduleList);
  }
}

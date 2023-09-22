import { ACollectionModule } from '../../helpers/abstract/collection.module.abstract';
import { CommandModule } from '../command/command.module';
import { AEvent } from './event.abstract';
import { ClientReady } from './services/clientReady';
import { Interaction } from './services/interaction';
import { MessageEvent } from './services/messageEvent';

class EventModule extends ACollectionModule<any, AEvent> {
  constructor(commandModule: CommandModule) {
    const moduleList: AEvent[] = [
      new ClientReady(),
      new MessageEvent(),
      new Interaction(commandModule),
    ];

    super(moduleList);
  }

  init(client: any) {
    this.modulesList.forEach((event) => {
      client[event.once ? 'once' : 'on'](event.event, (args: unknown[]) =>
        event.execute(args),
      );
    });
  }
}

export { EventModule };

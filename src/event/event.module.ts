import { ACollectionModule } from '../helpers/abstract/collection.module.abstract';
import { AEvent } from './event.abstract';
import { ClientReady } from './events/clientReady';
import { Interaction } from './events/interaction';
import { MessageEvent } from './events/messageEvent';

class EventModule extends ACollectionModule<any, AEvent> {
  constructor() {
    const moduleList: AEvent[] = [
      new ClientReady(),
      new MessageEvent(),
      new Interaction(),
    ];

    super(moduleList);
  }
}

export { EventModule };

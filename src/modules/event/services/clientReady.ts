import { Injectable } from '@nestjs/common';
import { ClientEvents, Events } from 'discord.js';
import { AEvent } from '../event.abstract';
import { CronService } from '../../cron-tasks/cron.service';

@Injectable()
export class ClientReady extends AEvent {
  constructor(private readonly cronService: CronService) {
    super();
  }

  event: keyof ClientEvents = Events.ClientReady;
  once: boolean = true;

  async execute(args: ClientEvents[Events.ClientReady]) {
    console.log('Successfully connected to Discord');
    console.log(`logged in as ${args[0].user.username}`);

    this.cronService.init();
  }
}

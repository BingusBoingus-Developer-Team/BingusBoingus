import { Client, TextChannel } from 'discord.js';
import BirthdayShoutoutTask from './tasks/birthday-shoutout.task';
import { Inject, Injectable } from '@nestjs/common';
import WakeUpTask from './tasks/wake-up.task';
import * as cron from 'node-cron';
import { BirthdayEntryService } from '../models/birthday/service/birthday-entry.service';
import { TaskEntry } from './interfaces/task-entry.interface';
import { DiscordService } from '../discord/discord.service';

@Injectable()
export class CronService {
  private static instance: CronService;
  private tasks: TaskEntry[];

  constructor(
    @Inject(BirthdayEntryService)
    private readonly birthdayService: BirthdayEntryService,
    @Inject(DiscordService)
    private readonly discordService: DiscordService,
  ) {
    if (CronService.instance) {
      throw new Error(`ERROR: An instance has already been created.`);
    }

    CronService.instance = this;
  }

  static getInstance(): CronService {
    return CronService.instance;
  }

  public init() {
    this.tasks = [
      {
        name: 'birthday-shoutout',
        schedule: '0 10 * * *',
        task: new BirthdayShoutoutTask(
          this.discordService.client.channels.cache.find(
            (channel) => channel.id === '447554141724737548',
          ) as TextChannel,
          this.birthdayService,
        ),
      },
      {
        name: 'first-of-the-month',
        schedule: '0 12 1 * *',
        task: new WakeUpTask(
          this.discordService.client.channels.cache.find(
            (channel) => channel.id === '447554141724737548',
          ) as TextChannel,
        ),
      },
    ];
    this.registerTasks();
  }

  registerTasks(): void {
    this.tasks.forEach((task) => {
      if (!cron.validate(task.schedule)) {
        throw new Error(
          `ERROR: Invalid cron schedule expression for task '${task.name}'`,
        );
      }

      cron
        .schedule(task.schedule, async () => {
          await task.task.execute();
        })
        .start();
    });
  }
}

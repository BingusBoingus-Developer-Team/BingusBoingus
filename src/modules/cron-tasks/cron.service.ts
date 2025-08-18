import { TextChannel } from 'discord.js';
import BirthdayShoutoutTask from './tasks/birthday-shoutout.task';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import WakeUpTask from './tasks/wake-up.task';
import * as cron from 'node-cron';
import { BirthdayEntryService } from '../models/birthday/service/birthday-entry.service';
import { TaskEntry } from './interfaces/task-entry.interface';
import { DiscordService } from '../discord/discord.service';
import { ServerConfigService } from '../models/config/service/server-config.service';
import { ServerConfigDocument } from '../../schemas/server-config.schema';

@Injectable()
export class CronService {
  private static instance: CronService;
  private tasks: TaskEntry[];

  constructor(
    @Inject(BirthdayEntryService)
    private readonly birthdayService: BirthdayEntryService,
    @Inject(DiscordService)
    private readonly discordService: DiscordService,
    @Inject(forwardRef(() => ServerConfigService))
    private readonly serverConfigService: ServerConfigService,
  ) {
    if (CronService.instance) {
      throw new Error(`ERROR: An instance has already been created.`);
    }

    CronService.instance = this;
  }

  static getInstance(): CronService {
    return CronService.instance;
  }

  public async init(reload = false): Promise<void> {
    const servers: ServerConfigDocument[] =
      await this.serverConfigService.getAll();
    let birthdayTasks = [];
    servers.forEach(async (server) => {
      // Make the surrounding forEach callback async: servers.forEach(async (server) => { ... })
      let birthdayChannel =
        (await this.discordService.client.channels.cache.get(
          server.channelId,
        )) as TextChannel;

      if (!birthdayChannel) {
        try {
          const fetched = await this.discordService.client.channels.fetch(
            server.channelId,
            { cache: true },
          );
          if (fetched?.isTextBased()) {
            birthdayChannel = fetched as TextChannel;
          } else {
            Logger.warn(
              `Channel ${server.channelId} is not a text-based channel.`,
            );
          }
        } catch (err) {
          Logger.warn(`Failed to fetch channel ${server.channelId}: ${err}`);
        }
      }
      birthdayTasks.push({
        name: 'birthday-shoutout',
        schedule: '0 10 * * *',
        task: new BirthdayShoutoutTask(birthdayChannel, this.birthdayService),
      });
    });
    let wakeUpTasks = [];
    await servers.forEach((server) => {
      const wakeUpChannel = this.discordService.client.channels.cache.find(
        (channel) => channel.id === server.channelId,
      ) as TextChannel;
      wakeUpTasks.push({
        name: 'first-of-the-month',
        schedule: '0 12 1 * *',
        task: new WakeUpTask(wakeUpChannel),
      });
    });
    Logger.log(`BirthdayTasks: ${birthdayTasks?.length ?? 0}`);
    (birthdayTasks ?? []).forEach((task) => {
      Logger.log(
        `Birthdaytask: ${task.name} - ${task.schedule} - Server: ${task?.task?.channel?.id}`,
      );
    });
    Logger.log(`WakeUpTasks: ${wakeUpTasks?.length ?? 0}`);
    (wakeUpTasks ?? []).forEach((task) => {
      Logger.log(
        `WakeUptask: ${task.name} - ${task.schedule} - Server: ${task?.task?.channel?.id}`,
      );
    });

    birthdayTasks = birthdayTasks.filter((task) => task?.task?.channel?.id);
    wakeUpTasks = wakeUpTasks.filter((task) => task?.task?.channel?.id);
    this.tasks = [...birthdayTasks, ...wakeUpTasks];
    this.registerTasks(reload);
  }

  private registerTasks(reload: boolean): void {
    if (reload === true) {
      cron.getTasks().forEach((task) => {
        task.stop();
      });
    }
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

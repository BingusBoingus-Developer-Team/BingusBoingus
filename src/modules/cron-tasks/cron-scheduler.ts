import { Client, TextChannel } from 'discord.js'
import { ITask } from './tasks/interfaces/task.interface'
import BirthdayShoutoutTask from './tasks/birthday-shoutout.task'
import * as cron from 'node-cron'
import { Inject } from '@nestjs/common'
import { BirthdayEntryService } from '../birthday/service/birthday-entry.service'
import WakeUpTask from './tasks/wake-up.task'


interface TaskEntry {
    name: string
    schedule: string
    task: ITask
}

class CronScheduler {
    private static instance: CronScheduler
    private client: Client
    private tasks: TaskEntry[]

    constructor(client: Client, @Inject(BirthdayEntryService) private readonly birthdayService?: BirthdayEntryService) {
        if (CronScheduler.instance) {
            throw new Error(`ERROR: An instance has already been created.`)
        }
        this.client = client
        this.tasks = [
            {
                name: 'birthday-shoutout',
                schedule: '0 10 * * *',
                task: new BirthdayShoutoutTask(
                    this.client.channels.cache.find((channel) => channel.id === '447554141724737548') as TextChannel,birthdayService
                ),
            },
            {
            name: 'first-of-the-month', 
            schedule: '0 12 1 * *',
            task: new WakeUpTask(
                this.client.channels.cache.find((channel) => channel.id === '447554141724737548') as TextChannel,
            ),
            },
        ]

        CronScheduler.instance = this
    }

    static getInstance(): CronScheduler {
        return CronScheduler.instance
    }

    registerTasks(): void {
        this.tasks.forEach((task) => {
            if (!cron.validate(task.schedule)) {
                throw new Error(`ERROR: Invalid cron schedule expression for task '${task.name}'`)
            }

            cron.schedule(task.schedule, async () => {
                await task.task.execute()
            }).start()
        })
    }
}

export { CronScheduler }
import { Module } from "@nestjs/common";
import { BirthdayEntryModule } from "../birthday/module/birthday-entry.module";
import BirthdayShoutoutTask from "./tasks/birthday-shoutout.task";
import { CronScheduler } from "./cron-scheduler";


@Module({
  imports: [
    BirthdayEntryModule,
  ],
  providers: [],
  exports: [],
})
export class TaskModule {}

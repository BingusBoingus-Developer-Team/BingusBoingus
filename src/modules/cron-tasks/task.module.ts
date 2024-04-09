import { Module } from "@nestjs/common";
import { BirthdayEntryModule } from "../birthday/module/birthday-entry.module";


@Module({
  imports: [
    BirthdayEntryModule,
  ],
  providers: [],
  exports: [],
})
export class TaskModule {}

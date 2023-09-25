import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { PingPongCommand } from './commands/pingpong';
import { HelloCommand } from './commands/hello';
import { CBDCommand } from './commands/cbd';
import { ReportedCommand } from './commands/reported';

@Module({
  providers: [CommandService, PingPongCommand, HelloCommand, CBDCommand, ReportedCommand],
  exports: [CommandService],
})
export class CommandModule {}

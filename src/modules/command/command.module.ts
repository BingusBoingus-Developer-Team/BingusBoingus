import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { PingPongCommand } from './commands/pingpong';
import { HelloCommand } from './commands/hello';
import { CBDCommand } from './commands/cbd';

@Module({
  providers: [CommandService, PingPongCommand, HelloCommand, CBDCommand],
  exports: [CommandService],
})
export class CommandModule {}

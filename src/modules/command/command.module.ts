import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { PingPongCommand } from './commands/pingpong';
import { HelloCommand } from './commands/hello';
import { CBDCommand } from './commands/cbd';
import { ReportedCommand } from './commands/reported';
import { BugReport } from './commands/bug';
import { CoinflipCommand } from './commands/coinflip';
import { GoldCommand } from './commands/gold';

@Module({
  providers: [
    CommandService,
    PingPongCommand,
    HelloCommand,
    CBDCommand,
    ReportedCommand,
    BugReport,
    CoinflipCommand,
    GoldCommand,
  ],
  exports: [CommandService],
})
export class CommandModule {}

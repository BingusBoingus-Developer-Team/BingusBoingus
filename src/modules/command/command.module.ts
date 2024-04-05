import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { PingPongCommand } from './commands/pingpong';
import { HelloCommand } from './commands/hello';
import { CBDCommand } from './commands/cbd';
import { ReportedCommand } from './commands/reported';
import { BugReport } from './commands/bug';
import { CoinflipCommand } from './commands/coinflip';
import { GoldCommand } from './commands/gold';
import SomeoneOnceSaidCommand from './commands/someone-once-said';
import { SomeoneOnceSaidModule } from '../someone-once-said/module/someone-once-said.module';
import GetRandomQuote from './commands/get-a-quote';
import { PollCommand } from './commands/poll';
import { PollModule } from '../poll/module/poll.module';
import { VersionModule } from '../version/module/version.module';
import { VersionCommand } from './commands/version';

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
    SomeoneOnceSaidCommand,
    GetRandomQuote,
    PollCommand,
    VersionCommand
  ],
  imports: [SomeoneOnceSaidModule, PollModule, VersionModule],
  exports: [CommandService],
})
export class CommandModule {}

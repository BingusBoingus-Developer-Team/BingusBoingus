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
import GetRandomQuote from './commands/get-a-quote';
import { PollCommand } from './commands/poll';
import { VersionCommand } from './commands/version';
import AddBirthdayEntryCommand from './commands/add-birthday-entry';
import ActivateBirthdayEntryShoutoutCommand from './commands/activate-birthday-shoutout';
import DeactivateBirthdayEntryShoutoutCommand from './commands/deactivate-birthday-shoutout';
import { SomeoneOnceSaidModule } from '../models/someone-once-said/module/someone-once-said.module';
import { PollModule } from '../models/poll/module/poll.module';
import { VersionModule } from '../models/version/module/version.module';
import { BirthdayEntryModule } from '../models/birthday/module/birthday-entry.module';

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
    VersionCommand,
    AddBirthdayEntryCommand,
    DeactivateBirthdayEntryShoutoutCommand,
    ActivateBirthdayEntryShoutoutCommand,
  ],
  imports: [SomeoneOnceSaidModule, PollModule, VersionModule, BirthdayEntryModule],
  exports: [CommandService],
})
export class CommandModule {}

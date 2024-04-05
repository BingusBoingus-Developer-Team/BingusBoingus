import { Injectable } from '@nestjs/common';
import { Collection } from 'discord.js';
import { CBDCommand } from './commands/cbd';
import { ACommand } from './command.abstract';
import { ReportedCommand } from './commands/reported';
import { BugReport } from './commands/bug';
import { CoinflipCommand } from './commands/coinflip';
import { GoldCommand } from './commands/gold';
import SomeoneOnceSaidCommand from './commands/someone-once-said';
import GetRandomQuote from './commands/get-a-quote';
import { PollCommand } from './commands/poll';
import { VersionCommand } from './commands/version';

@Injectable()
export class CommandService {
  private commands: Collection<string, ACommand> = new Collection();

  constructor(
    //pingpongModule: PingPongCommand,
    //helloModule: HelloCommand,
    cbdModule: CBDCommand,
    reportedModule: ReportedCommand,
    bugReportModule: BugReport,
    coinflipModule: CoinflipCommand,
    goldModule: GoldCommand,
    someoneOnceSaidModule: SomeoneOnceSaidCommand,
    getRandomQuoteModule: GetRandomQuote,
    pollModule: PollCommand,
    versionModule: VersionCommand
  ) {
    const commands: ACommand[] = [
      //pingpongModule,
      //helloModule,
      cbdModule,
      reportedModule,
      bugReportModule,
      coinflipModule,
      goldModule,
      someoneOnceSaidModule,
      getRandomQuoteModule,
      pollModule,
      versionModule
    ];
    commands.forEach((command) => {
      if (command.data.name && command.execute) {
        console.log('command-name: ' + command.data.name);
        this.commands.set(command.data.name, command);
      } else {
        console.error("couldn't read command:");
        console.error(this);
      }
    });
  }

  public getCommand(commandName: string): ACommand {
    if (this.commands.has(commandName)) return this.commands.get(commandName);
    return null;
  }

  getAllCommands() {
    return this.commands;
  }
}

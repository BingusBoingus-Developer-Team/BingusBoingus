import { Module } from '@nestjs/common';
import { DeployServcice } from './deploy.service';
import { CommandModule } from '../modules/command/command.module';
import { AppConfigModule } from '../config/config.module';

@Module({
  imports: [CommandModule, AppConfigModule],
  providers: [DeployServcice],
})
export class DeployModule {}

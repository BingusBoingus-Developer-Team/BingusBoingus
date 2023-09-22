import { Module } from '@nestjs/common';
import { DeployServcice } from './deploy.service';
import { CommandModule } from '../modules/command/command.module';

@Module({
  imports: [CommandModule],
  providers: [DeployServcice],
})
export class DeployModule {}

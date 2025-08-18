import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerConfigService } from '../service/server-config.service';
import {
  ServerConfig,
  ServerConfigSchema,
} from '../../../../schemas/server-config.schema';
import { TaskModule } from '../../../cron-tasks/task.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ServerConfig.name,
        schema: ServerConfigSchema,
      },
    ]),
    forwardRef(() => TaskModule),
  ],
  controllers: [],
  providers: [ServerConfigService],
  exports: [ServerConfigService],
})
export class ServerConfigModule {}

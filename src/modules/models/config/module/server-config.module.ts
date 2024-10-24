import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerConfigService } from '../service/server-config.service';
import {
  ServerConfig,
  ServerConfigSchema,
} from '../../../../schemas/server-config.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ServerConfig.name,
        schema: ServerConfigSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [ServerConfigService],
  exports: [ServerConfigService],
})
export class ServerConfigModule {}

import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { DiscordModule } from './modules/discord/discord.module';
import { CommandModule } from './modules/command/command.module';
import { EventModule } from './modules/event/event.module';
import { DeployModule } from './deployment/deploy.module';
import { MongoDatabaseProviderModule } from './config/database/mongo/provider/mongo-provider.module';

@Module({
  imports: [
    AppConfigModule,
    DiscordModule,
    CommandModule,
    DeployModule,
    EventModule,
    MongoDatabaseProviderModule,
  ],
})
export class AppModule {}

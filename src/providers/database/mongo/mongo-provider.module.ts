import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { AppConfigModule } from '../../../config/config.module';
import { AppConfigService } from '../../../config/config.service';
import { CommandSchema } from './schemas/command.schema';
import { AutoResponseSchema } from './schemas/auto-response.schema';
import { QuoteSchema } from './schemas/quote.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useExisting: AppConfigService,
    } as MongooseModuleAsyncOptions),
    MongooseModule.forFeature([
      { name: 'Quote', schema: QuoteSchema },
      { name: 'Command', schema: CommandSchema },
      { name: 'AutoResponse', schema: AutoResponseSchema },
    ]),
  ],

  providers: [],
  exports: [],
})
export class MongoDatabaseProviderModule {}

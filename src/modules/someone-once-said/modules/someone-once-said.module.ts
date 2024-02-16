import { Module } from '@nestjs/common';
import { SomeoneOnceSaidSchema } from '../../../schemas/someone-once-said.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SomeoneOnceSaid } from '../services/someone-once-said.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'SomeneOnceSaid',
        schema: SomeoneOnceSaidSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [SomeoneOnceSaid],
  exports: [SomeoneOnceSaid],
})
export class ProductionOrderStatisticModule {}

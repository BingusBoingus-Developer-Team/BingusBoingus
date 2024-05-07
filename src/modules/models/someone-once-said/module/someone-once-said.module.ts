import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SomeoneOnceSaidService } from '../service/someone-once-said.service';
import { SomeoneOnceSaid, SomeoneOnceSaidSchema } from '../../../../schemas/someone-once-said.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SomeoneOnceSaid.name,
        schema: SomeoneOnceSaidSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [SomeoneOnceSaidService],
  exports: [SomeoneOnceSaidService],
})
export class SomeoneOnceSaidModule {}

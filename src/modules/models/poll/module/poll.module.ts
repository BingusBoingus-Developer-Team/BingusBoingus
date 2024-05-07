import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbPollService } from '../service/db-poll.service';
import { PollService } from '../service/poll.service';
import { Poll, PollSchema } from '../../../../schemas/poll.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Poll.name,
        schema: PollSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [DbPollService, PollService],
  exports: [PollService],
})
export class PollModule {}

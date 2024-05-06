import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Poll, PollSchema } from '../../../schemas/poll.schema';
import { DbPollService } from '../service/db-poll.service';
import { PollService } from '../service/poll.service';

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

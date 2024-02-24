import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Poll, PollSchema } from '../../../schemas/poll.schema';
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
  providers: [PollService],
  exports: [PollService],
})
export class PollModule {}

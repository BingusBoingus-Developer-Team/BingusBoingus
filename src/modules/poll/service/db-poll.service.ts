import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PollDocument } from '../../../schemas/poll.schema';
import { PollEntity } from '../../../schemas/poll-entity.model';
import { UpdatePollDto } from '../dto/update-poll.dto';

export class DbPollService {
  constructor(
    @InjectModel('Poll')
    private readonly pollModel: Model<PollDocument>,
  ) {}

  async create(pollDto: PollEntity): Promise<PollDocument> {
    try {
      return await this.pollModel.create({
        msg: pollDto.msg,
        ownerName: pollDto.ownerName,
        upvotes: pollDto.upvotes,
        downvotes: pollDto.downvotes,
        upMembers: pollDto?.upMembers ?? [],
        downMembers: pollDto?.downMembers ?? [],
        active: true,
        createdAt: new Date(),
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async update(updateDto: UpdatePollDto): Promise<PollDocument> {
    try {
      return await this.pollModel.findOneAndUpdate(
        { msg: updateDto.msg },
        {
          upvotes: updateDto.upvotes,
          downvotes: updateDto?.downvotes,
          upMembers: updateDto?.upMembers,
          downMembers: updateDto?.downMembers,
          active: updateDto?.active,
        },
        { new: true },
      );
    } catch (e) {
      return null;
    }
  }

  async get(messageId: string): Promise<PollDocument> {
    try {
      const test = await this.pollModel.findOne({
        msg: messageId,
        active: true,
      });
      return test;
    } catch (e) {
      return null;
    }
  }
}

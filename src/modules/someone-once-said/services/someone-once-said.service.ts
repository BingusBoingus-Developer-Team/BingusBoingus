import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { SomeoneOnceSaidEntity } from '../../../schemas/someone-once-said-entity.model';
import { SomeoneOnceSaidDocument } from '../../../schemas/someone-once-said.schema';

export class SomeoneOnceSaidService {
  constructor(
    @InjectModel('SomeoneOnceSaid')
    private readonly someoneOnceSaid: Model<SomeoneOnceSaidDocument>,
  ) {}

  async create(
    quoteDto: SomeoneOnceSaidEntity,
  ): Promise<SomeoneOnceSaidDocument> {
    try {
      return await this.someoneOnceSaid.create({
        phrase: quoteDto.phrase,
        username: quoteDto.username,
        secName: quoteDto?.secName,
        createdAt: new Date(),
      });
    } catch (e) {
      return null;
    }
  }

  async deleteProductionOrderForUser(username: string) {
    try {
      await this.someoneOnceSaid.deleteMany({ username: username });
    } catch (e) {
      return new Error('Error deleting Quotes for username: ' + username);
    }
    return;
  }

  async getRandomQuote(): Promise<SomeoneOnceSaidDocument | null> {
    try {
      const count = await this.someoneOnceSaid.countDocuments();

      const randomIndex = Math.floor(Math.random() * count);

      const randomQuote = await this.someoneOnceSaid
        .findOne()
        .skip(randomIndex)
        .limit(1);

      return randomQuote;
    } catch (error) {
      console.error('Error fetching random quote:', error);
      return null;
    }
  }
}

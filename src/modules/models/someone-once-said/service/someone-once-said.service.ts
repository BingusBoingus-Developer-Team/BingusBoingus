import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SomeoneOnceSaidDocument } from '../../../../schemas/someone-once-said.schema';
import { SomeoneOnceSaidEntity } from '../../../../schemas/someone-once-said-entity.model';

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

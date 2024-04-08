import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BirthdayEntryDocument } from '../../../schemas/birthday-entry.schema';
import { BirthdayEntryEntity } from '../../../schemas/birthday-entry.model';

export class BirthdayEntryService {
  constructor(
    @InjectModel('BirthdayEntry')
    private readonly birthdayEntry: Model<BirthdayEntryDocument>,
  ) {}
  async createOrUpdateBirthdayEntry(birthdayEntryDto: BirthdayEntryEntity,) {
    const birthdayEntry = await this.birthdayEntry.findOne({ username: birthdayEntryDto.username });
    if (birthdayEntry) {
      return await this.updateBirthdayEntry(birthdayEntryDto);
    } else {
      return await this.create(birthdayEntryDto);
    }
  }

  async create(
    birthdayEntryDto: BirthdayEntryEntity,
  ): Promise<BirthdayEntryDocument> {
    try {
      return await this.birthdayEntry.create({
        username: birthdayEntryDto.username,
        secName: birthdayEntryDto?.secName,
        birthDate: birthdayEntryDto.birthDate,
        active: true,
        createdAt: new Date(),
      });
    } catch (e) {
      return null;
    }
  }

  async updateBirthdayEntry(birthdayEntryDto: BirthdayEntryEntity): Promise<BirthdayEntryDocument> {
    try {
      return await this.birthdayEntry.findOneAndUpdate(
        { username: birthdayEntryDto.username },
        {
          secName: birthdayEntryDto.secName,
          birthDate: birthdayEntryDto.birthDate,
          active: birthdayEntryDto.active,
        },
        { new: true },
      );
    } catch (e) {
      return null;
    }
  }

  async getEntryForToday(): Promise<BirthdayEntryDocument[]> {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    return await this.birthdayEntry.find({
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: '$birthDate' }, day] },
          { $eq: [{ $month: '$birthDate' }, month] },
        ],
      },
    });
  }
}

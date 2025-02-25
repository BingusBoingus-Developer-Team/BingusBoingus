import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrUpdateBirthdayEntryDto } from '../dto/create-or-update-birthday-entry.dto';
import { BirthdayEntryDocument } from '../../../../schemas/birthday-entry.schema';

export class BirthdayEntryService {
  constructor(
    @InjectModel('BirthdayEntry')
    private readonly birthdayEntry: Model<BirthdayEntryDocument>,
  ) {}
  async createOrUpdateBirthdayEntry(
    birthdayEntryDto: CreateOrUpdateBirthdayEntryDto,
  ) {
    const birthdayEntry = await this.birthdayEntry.findOne({
      username: birthdayEntryDto.username,
      serverId: birthdayEntryDto.serverId,
    });
    if (birthdayEntry) {
      return await this.updateBirthdayEntry(birthdayEntryDto);
    } else {
      return await this.create(birthdayEntryDto);
    }
  }

  async create(
    birthdayEntryDto: CreateOrUpdateBirthdayEntryDto,
  ): Promise<BirthdayEntryDocument> {
    try {
      return await this.birthdayEntry.create({
        username: birthdayEntryDto.username,
        secName: birthdayEntryDto?.secName,
        birthDate: birthdayEntryDto.birthDate,
        active: true,
        serverId: birthdayEntryDto.serverId,
        createdAt: new Date(),
      });
    } catch (e) {
      return null;
    }
  }

  async updateBirthdayEntry(
    birthdayEntryDto: CreateOrUpdateBirthdayEntryDto,
  ): Promise<BirthdayEntryDocument> {
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
    try {
      const entries = await this.birthdayEntry.find<BirthdayEntryDocument>({
        active: true,
      });
      if (!entries) {
        return null;
      }

      const today = new Date();

      return entries.filter((entry) => {
        const date = new Date(entry.birthDate);
        return (
          date.getFullYear() !== today.getFullYear() &&
          date.getMonth() === today.getMonth() &&
          date.getDate() === today.getDate()
        );
      });
    } catch (e) {
      return null;
    }
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BirthdayEntry, BirthdayEntrySchema } from '../../../schemas/birthday-entry.schema';
import { BirthdayEntryService } from '../service/birthday-entry.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BirthdayEntry.name,
        schema: BirthdayEntrySchema,
      },
    ]),
  ],
  controllers: [],
  providers: [BirthdayEntryService],
  exports: [BirthdayEntryService],
})
export class BirthdayEntryModule {}

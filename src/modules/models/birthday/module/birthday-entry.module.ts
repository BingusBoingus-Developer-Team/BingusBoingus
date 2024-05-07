import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BirthdayEntryService } from '../service/birthday-entry.service';
import { BirthdayEntryController } from '../controller/birthday-entry.controller';
import { BirthdayEntry, BirthdayEntrySchema } from '../../../../schemas/birthday-entry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BirthdayEntry.name,
        schema: BirthdayEntrySchema,
      },
    ]),
  ],
  controllers: [BirthdayEntryController],
  providers: [BirthdayEntryService],
  exports: [BirthdayEntryService],
})
export class BirthdayEntryModule {}

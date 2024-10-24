import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class BirthdayEntry {
  @Prop({ required: true })
  username: string;

  @Prop({ required: false })
  secName: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  active: boolean;

  @Prop({ required: true })
  serverId: string;

  @Prop({ required: true })
  createdAt: Date;

  constructor(data) {
    Object.assign(this, data);
  }
}

export type BirthdayEntryDocument = BirthdayEntry & Document;

export const BirthdayEntrySchema = SchemaFactory.createForClass(BirthdayEntry);

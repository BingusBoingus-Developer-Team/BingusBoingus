import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SomeoneOnceSaid {
  @Prop({ required: true })
  phrase: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: false })
  secName: string;

  @Prop({ required: true })
  createdAt: Date;

  constructor(data) {
    Object.assign(this, data);
  }
}

export type SomeoneOnceSaidDocument = SomeoneOnceSaid & Document;

export const SomeoneOnceSaidSchema =
  SchemaFactory.createForClass(SomeoneOnceSaid);

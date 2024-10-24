import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Poll {
  @Prop({ required: true })
  msg: string;

  @Prop({ required: true })
  ownerName: string;

  @Prop({ required: true })
  upvotes: number;

  @Prop({ required: true })
  downvotes: number;

  @Prop({ required: false })
  upMembers: string[];

  @Prop({ required: false })
  downMembers: string[];

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

export type PollDocument = Poll & Document;

export const PollSchema = SchemaFactory.createForClass(Poll);

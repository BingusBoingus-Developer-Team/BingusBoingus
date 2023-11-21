import { Schema, model, Model, Document } from 'mongoose';

export interface CommandDocument extends Document {
  commandName: string;
  response: string;
  responseType?: ResponseType;
}

export enum ResponseType {
  reply = 'replyToMessage',
  channel = 'replyToChannel',
  dm = 'replyInDirectMessage',
}

export const CommandSchema: Schema = new Schema(
  {
    commandName: {
      type: String,
      required: true,
      unique: true,
    },
    response: {
      type: String,
      required: true,
    },
    responseType: {
      type: ResponseType,
      required: false,
      default: ResponseType.reply,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export const CommandModel: Model<CommandDocument> = model<
  CommandDocument,
  Model<CommandDocument>
>('Command', CommandSchema);

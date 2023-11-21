import { Schema, model, Model, Document } from 'mongoose';
import { ResponseType } from './command.schema';

export interface AutoResponseDocument extends Document {
  regex: RegExp;
  response: string;
  responseType?: ResponseType;
}

export const AutoResponseSchema: Schema = new Schema(
  {
    regex: {
      type: RegExp,
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

export const AutoResponseModel: Model<AutoResponseDocument> = model<
  AutoResponseDocument,
  Model<AutoResponseDocument>
>('AutoRespone', AutoResponseSchema);

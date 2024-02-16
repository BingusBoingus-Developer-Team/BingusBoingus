import { Schema, model, Model, Document } from 'mongoose';
import { ResponseType } from './command.schema';

export interface AutoResponseDocument extends Document {
  regex: RegExp;
  response: string;
  responseType?: ResponseType;
}

const regexValidator = {
  validator: (value: any) => {
    try {
      // Attempt to create a RegExp object from the provided value
      new RegExp(value);
      return true;
    } catch (error) {
      return false;
    }
  },
  message: 'Invalid regular expression format',
};

export const AutoResponseSchema: Schema = new Schema(
  {
    regex: {
      type: Schema.Types.Mixed,
      required: true,
      unique: true,
      validate: regexValidator,
    },
    response: {
      type: String,
      required: true,
    },
    responseType: {
      type: String,
      enum: Object.values(ResponseType),
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
>('AutoResponse', AutoResponseSchema);

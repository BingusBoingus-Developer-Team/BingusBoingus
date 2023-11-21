import { Schema, model, Model, Document } from 'mongoose';

export interface QuoteDocument extends Document {
  id: number;
  quote: string;
  userName: string;
}

export const QuoteSchema: Schema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    quote: {
      type: String,
      required: true,
      unique: false,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export const QuoteModel: Model<QuoteDocument> = model<
  QuoteDocument,
  Model<QuoteDocument>
>('Quote', QuoteSchema);

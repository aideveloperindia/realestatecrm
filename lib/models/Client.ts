import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IClient extends Document {
  name: string;
  phone: string; // E.164 format
  email?: string;
  address?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for phone deduplication
ClientSchema.index({ phone: 1 });

const Client: Model<IClient> = mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);

export default Client;


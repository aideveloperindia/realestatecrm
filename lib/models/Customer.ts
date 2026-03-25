import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  phone: string; // E.164 format
  email?: string;
  budget_min: number;
  budget_max: number;
  preferred_types: string[]; // e.g., ['apartment', 'house', 'plot']
  preferred_locations: {
    city?: string;
    locality?: string;
    district?: string;
  };
  opt_in_whatsapp: boolean;
  opt_in_timestamp?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema: Schema = new Schema(
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
    budget_min: {
      type: Number,
      required: true,
      min: 0,
    },
    budget_max: {
      type: Number,
      required: true,
      min: 0,
    },
    preferred_types: {
      type: [String],
      default: [],
    },
    preferred_locations: {
      city: String,
      locality: String,
      district: String,
    },
    opt_in_whatsapp: {
      type: Boolean,
      default: false,
    },
    opt_in_timestamp: {
      type: Date,
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
CustomerSchema.index({ phone: 1 });

const Customer: Model<ICustomer> = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);

export default Customer;


import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  type: string; // e.g., 'apartment', 'house', 'plot', 'commercial'
  price: number;
  location: {
    city: string;
    locality?: string;
    district?: string;
    address?: string;
  };
  client_id: mongoose.Types.ObjectId;
  bedrooms?: number;
  bathrooms?: number;
  area?: number; // in sqft
  description?: string;
  status: 'available' | 'sold' | 'on_hold';
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      city: {
        type: String,
        required: true,
        trim: true,
      },
      locality: {
        type: String,
        trim: true,
      },
      district: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
    },
    client_id: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    bedrooms: {
      type: Number,
      min: 0,
    },
    bathrooms: {
      type: Number,
      min: 0,
    },
    area: {
      type: Number,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'on_hold'],
      default: 'available',
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for matching queries
PropertySchema.index({ type: 1, 'location.city': 1, 'location.locality': 1 });
PropertySchema.index({ status: 1 });
PropertySchema.index({ price: 1 });

const Property: Model<IProperty> = mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);

export default Property;


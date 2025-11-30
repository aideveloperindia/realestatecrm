import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMatch extends Document {
  customer_id: mongoose.Types.ObjectId;
  property_id: mongoose.Types.ObjectId;
  score: number;
  type_match: number;
  location_score: number;
  price_score: number;
  reasons: string[];
  viewed_at?: Date;
  createdAt: Date;
}

const MatchSchema: Schema = new Schema(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    property_id: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    type_match: {
      type: Number,
      required: true,
    },
    location_score: {
      type: Number,
      required: true,
    },
    price_score: {
      type: Number,
      required: true,
    },
    reasons: {
      type: [String],
      default: [],
    },
    viewed_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for querying matches
MatchSchema.index({ customer_id: 1, score: -1 });
MatchSchema.index({ property_id: 1 });

const Match: Model<IMatch> = mongoose.models.Match || mongoose.model<IMatch>('Match', MatchSchema);

export default Match;


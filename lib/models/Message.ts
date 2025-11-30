import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage extends Document {
  to_phone: string; // E.164 format
  message_text: string;
  method: 'wa.me' | 'cloud_api' | 'twilio' | 'manual';
  status: 'recorded' | 'sent' | 'failed' | 'pending';
  property_id?: mongoose.Types.ObjectId;
  customer_id?: mongoose.Types.ObjectId;
  sent_at?: Date;
  error_message?: string;
  created_by: mongoose.Types.ObjectId; // User ID
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    to_phone: {
      type: String,
      required: true,
      trim: true,
    },
    message_text: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      enum: ['wa.me', 'cloud_api', 'twilio', 'manual'],
      required: true,
    },
    status: {
      type: String,
      enum: ['recorded', 'sent', 'failed', 'pending'],
      default: 'recorded',
    },
    property_id: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
    },
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    sent_at: {
      type: Date,
    },
    error_message: {
      type: String,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for querying
MessageSchema.index({ to_phone: 1 });
MessageSchema.index({ customer_id: 1 });
MessageSchema.index({ property_id: 1 });
MessageSchema.index({ createdAt: -1 });

const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;


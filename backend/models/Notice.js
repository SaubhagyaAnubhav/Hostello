import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['General', 'Maintenance', 'Fee', 'Food', 'Event', 'Emergency'],
      default: 'General',
    },
    priority: {
      type: String,
      enum: ['Normal', 'High', 'Urgent'],
      default: 'Normal',
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    audience: {
      type: String,
      enum: ['All', 'Your Space 1', 'Your Space 2'],
      default: 'All',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Notice', noticeSchema);
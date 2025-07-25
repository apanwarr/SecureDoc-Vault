import mongoose from 'mongoose';

const shareLinkSchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
  },
  accessCount: {
    type: Number,
    default: 0
  },
  maxAccess: {
    type: Number,
    default: 10
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// TTL index for automatic cleanup
shareLinkSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('ShareLink', shareLinkSchema);
import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true,
    unique: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  encryptedPath: {
    type: String,
    required: true
  },
  encryptionKey: {
    type: String,
    required: true
  },
  iv: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    maxlength: 500
  },
  tags: [{
    type: String,
    trim: true
  }],
  downloadCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

fileSchema.index({ uploadedBy: 1, createdAt: -1 });
fileSchema.index({ tags: 1 });

export default mongoose.model('File', fileSchema);
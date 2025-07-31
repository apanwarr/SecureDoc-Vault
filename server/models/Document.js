import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  filename: { 
    type: String, 
    required: true 
  },
  originalName: { 
    type: String, 
    required: true 
  },
  cloudinaryUrl: { 
    type: String, 
    required: true 
  },
  cloudinaryId: { 
    type: String, 
    required: true 
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  shareLink: { 
    type: String, 
    unique: true 
  },
  qrCode: { 
    type: String 
  },
  expiresAt: { 
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  },
  accessLog: [{
    accessedBy: { 
      type: String,
      default: 'Anonymous'
    },
    accessedAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});

documentSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Document', documentSchema);

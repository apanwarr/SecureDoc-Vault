import express from 'express';
import crypto from 'crypto';
import QRCode from 'qrcode';
import Document from '../models/Document.js';
import authMiddleware from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const shareLink = crypto.randomBytes(32).toString('hex');

    const document = new Document({
      filename: req.file.filename,
      originalName: req.file.originalname,
      cloudinaryUrl: req.file.path,
      cloudinaryId: req.file.filename,
      owner: req.user.userId,
      shareLink
    });

    //const shareUrl = `${process.env.FRONTEND_URL || 'http://localhost:8000/api'}/share/${shareLink}/download`;
    const shareUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/share/${shareLink}/download`;
    const qrCode = await QRCode.toDataURL(shareUrl);
    document.qrCode = qrCode;

    await document.save();

    res.status(201).json({
      message: 'File uploaded successfully',
      document: {
        id: document._id,
        filename: document.originalName,
        shareLink: shareUrl,
        qrCode,
        expiresAt: document.expiresAt,
        createdAt: document.createdAt
      }
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        details: Object.keys(error.errors).map(key => ({
          field: key,
          message: error.errors[key].message
        }))
      });
    }

    if (error.name === 'MongoServerError' || error.name === 'MongoError') {
      return res.status(500).json({ message: 'Database error occurred' });
    }

    res.status(500).json({ 
      message: 'File upload failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const documents = await Document.find({ 
      owner: req.user.userId,
      isActive: true 
    }).sort({ createdAt: -1 });

    const documentsWithShareLinks = documents.map(doc => ({
      ...doc.toObject(),
      shareLink: `${process.env.FRONTEND_URL || 'http://localhost:8000/api'}/share/${doc.shareLink}/download`
    }));

    res.json(documentsWithShareLinks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch documents' });
  }
});

router.get('/:id/logs', authMiddleware, async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      owner: req.user.userId
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json(document.accessLog.reverse());
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch access logs' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const document = await Document.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.userId },
      { isActive: false },
      { new: true }
    );

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete document' });
  }
});

export default router;

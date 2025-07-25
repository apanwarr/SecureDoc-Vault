import express from 'express';
import fs from 'fs';
import path from 'path';
import { authenticate } from '../middleware/auth.js';
import { upload } from '../utils/fileUpload.js';
import { encryptFile, decryptFile, generateKey, generateIV, generateSecureToken } from '../utils/encryption.js';
import File from '../models/File.js';
import ShareLink from '../models/ShareLink.js';

const router = express.Router();

// Upload file
router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { description, tags } = req.body;
    const key = generateKey();
    const iv = generateIV();
    
    const encryptedFilename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.enc`;
    const encryptedPath = path.join('uploads/encrypted', encryptedFilename);

    // Encrypt the file
    await encryptFile(req.file.path, encryptedPath, key, iv);

    // Save file metadata to database
    const fileDoc = new File({
      originalName: req.file.originalname,
      filename: encryptedFilename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      encryptedPath,
      encryptionKey: key.toString('hex'),
      iv: iv.toString('hex'),
      uploadedBy: req.user._id,
      description: description || '',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    await fileDoc.save();

    res.status(201).json({
      message: 'File uploaded successfully',
      file: {
        id: fileDoc._id,
        originalName: fileDoc.originalName,
        size: fileDoc.size,
        mimetype: fileDoc.mimetype,
        description: fileDoc.description,
        tags: fileDoc.tags,
        createdAt: fileDoc.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's files
router.get('/my-files', authenticate, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const files = await File.find({ 
      uploadedBy: req.user._id, 
      isActive: true 
    })
    .select('-encryptionKey -iv -encryptedPath')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    const total = await File.countDocuments({ 
      uploadedBy: req.user._id, 
      isActive: true 
    });

    res.json({
      files,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate share link
router.post('/share/:fileId', authenticate, async (req, res) => {
  try {
    const { fileId } = req.params;
    const { maxAccess = 10 } = req.body;

    const file = await File.findOne({ 
      _id: fileId, 
      uploadedBy: req.user._id, 
      isActive: true 
    });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const token = generateSecureToken();
    
    const shareLink = new ShareLink({
      fileId: file._id,
      token,
      createdBy: req.user._id,
      maxAccess
    });

    await shareLink.save();

    res.json({
      message: 'Share link generated successfully',
      shareLink: {
        token,
        url: `${process.env.FRONTEND_URL}/download/${token}`,
        expiresAt: shareLink.expiresAt,
        maxAccess: shareLink.maxAccess
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download file via share link
router.get('/download/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const shareLink = await ShareLink.findOne({ 
      token, 
      isActive: true,
      expiresAt: { $gt: new Date() }
    }).populate('fileId');

    if (!shareLink) {
      return res.status(404).json({ error: 'Link not found or expired' });
    }

    if (shareLink.accessCount >= shareLink.maxAccess) {
      return res.status(403).json({ error: 'Maximum access limit reached' });
    }

    const file = shareLink.fileId;
    if (!file || !file.isActive) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Increment access count
    shareLink.accessCount += 1;
    await shareLink.save();

    // Increment download count
    file.downloadCount += 1;
    await file.save();

    // Decrypt file to temp location
    const tempFilename = `temp-${Date.now()}-${file.originalName}`;
    const tempPath = path.join('uploads/temp', tempFilename);
    
    const key = Buffer.from(file.encryptionKey, 'hex');
    const iv = Buffer.from(file.iv, 'hex');

    await decryptFile(file.encryptedPath, tempPath, key, iv);

    // Send file
    res.download(tempPath, file.originalName, (err) => {
      // Clean up temp file
      fs.unlink(tempPath, () => {});
      
      if (err) {
        console.error('Download error:', err);
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete file
router.delete('/:fileId', authenticate, async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await File.findOne({ 
      _id: fileId, 
      uploadedBy: req.user._id 
    });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Soft delete
    file.isActive = false;
    await file.save();

    // Deactivate all share links for this file
    await ShareLink.updateMany(
      { fileId: file._id }, 
      { isActive: false }
    );

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get file details
router.get('/:fileId', authenticate, async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await File.findOne({ 
      _id: fileId, 
      uploadedBy: req.user._id,
      isActive: true 
    }).select('-encryptionKey -iv -encryptedPath');

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json({ file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get share links for a file
router.get('/:fileId/shares', authenticate, async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await File.findOne({ 
      _id: fileId, 
      uploadedBy: req.user._id,
      isActive: true 
    });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const shareLinks = await ShareLink.find({ 
      fileId: file._id,
      isActive: true 
    }).select('-fileId').sort({ createdAt: -1 });

    res.json({ shareLinks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
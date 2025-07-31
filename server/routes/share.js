import express from 'express';
import axios from 'axios'; 
import Document from '../models/Document.js';

const router = express.Router();

router.get('/:shareLink/download', async (req, res) => {
  try {
    const { shareLink } = req.params;

    const document = await Document.findOne({ 
      shareLink,
      isActive: true 
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found or link invalid' });
    }

    if (new Date() > document.expiresAt) {
      return res.status(410).json({ message: 'Share link has expired' });
    }

    const response = await axios({
      method: 'GET',
      url: document.cloudinaryUrl,
      responseType: 'stream'
    });

    res.setHeader('Content-Disposition', `attachment; filename="${document.originalName}"`);
    response.data.pipe(res);

  } catch (error) {
    console.error('Download error:', error.message);
    res.status(500).json({ message: 'Failed to download document' });
  }
});

export default router;


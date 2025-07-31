import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import documentRoutes from './routes/documents.js';
import shareRoutes from './routes/share.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/securedocvault', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/share', shareRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'SecureDoc Vault API is running!' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const ALGORITHM = 'aes-256-gcm';

export const generateKey = () => {
  return crypto.randomBytes(32);
};

export const generateIV = () => {
  return crypto.randomBytes(16);
};

export const encryptFile = async (inputPath, outputPath, key, iv) => {
  return new Promise((resolve, reject) => {
    const cipher = crypto.createCipher(ALGORITHM, key);
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    input.pipe(cipher).pipe(output);

    output.on('finish', () => {
      // Clean up original file
      fs.unlinkSync(inputPath);
      resolve();
    });

    output.on('error', reject);
  });
};

export const decryptFile = async (inputPath, outputPath, key, iv) => {
  return new Promise((resolve, reject) => {
    const decipher = crypto.createDecipher(ALGORITHM, key);
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    input.pipe(decipher).pipe(output);

    output.on('finish', resolve);
    output.on('error', reject);
  });
};

export const generateSecureToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

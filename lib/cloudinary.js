import { v2 as cloudinary } from 'cloudinary';

// Parse CLOUDINARY_URL if provided, otherwise use individual env vars
let cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dmnyitsre';
let apiKey = process.env.CLOUDINARY_API_KEY || '512598498546116';
let apiSecret = process.env.CLOUDINARY_API_SECRET;

if (process.env.CLOUDINARY_URL) {
  // CLOUDINARY_URL format: cloudinary://api_key:api_secret@cloud_name
  const urlMatch = process.env.CLOUDINARY_URL.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
  if (urlMatch) {
    apiKey = urlMatch[1];
    apiSecret = urlMatch[2];
    cloudName = urlMatch[3];
  }
}

if (!apiSecret) {
  console.warn('Warning: Cloudinary API secret not found. Uploads may fail.');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export default cloudinary;


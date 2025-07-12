import { v2 as cloudinary } from 'cloudinary';

import dotenv from 'dotenv';

dotenv.config(); 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export function generateSignedCloudinaryUrl(publicId: string): string {
  if (!publicId) return '';

  const signedUrl = cloudinary.url(publicId, {
    secure: true,
    sign_url: true,
    type: 'authenticated',
    transformation: [{ width: 300, crop: 'scale' }],
    timestamp: Math.floor(Date.now() / 1000) + 300, // Expires in 5 minutes
  });

  return signedUrl;
}

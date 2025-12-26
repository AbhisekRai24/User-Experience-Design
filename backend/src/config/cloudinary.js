
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';

// // Configure cloudinary immediately when this module loads
// // By this time, dotenv.config() should have already run in server.js
// console.log('Configuring Cloudinary with:', {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET ? '✓ Present' : '❌ Missing',
// });

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true, // ✅ Add this
//   timeout: 60000, // ✅ Add 60 second timeout
// });

// // Verify configuration was set
// const config = cloudinary.config();
// console.log('Cloudinary configured:', {
//   cloud_name: config.cloud_name,
//   api_key: config.api_key ? '✓ Set' : '❌ Not set',
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'localspace/events',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     // ✅ Optional: Add transformation to resize large images
//     transformation: [{ width: 2000, height: 2000, crop: 'limit' }],
//   },
// });

// // ✅ IMPORTANT: Add file size limits
// export const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     // Additional validation
//     const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (allowedMimes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only JPEG, PNG and WEBP are allowed.'));
//     }
//   }
// });

// export default cloudinary;


import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure cloudinary
console.log('Configuring Cloudinary with:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? '✓ Present' : '❌ Missing',
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  timeout: 60000,
});

// Verify configuration
const config = cloudinary.config();
console.log('Cloudinary configured:', {
  cloud_name: config.cloud_name,
  api_key: config.api_key ? '✓ Set' : '❌ Not set',
});

// Storage configuration for event images
const eventStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'localspace/events',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 2000, height: 2000, crop: 'limit' }],
  },
});

// Storage configuration for profile images
const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'localspace/profiles',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { width: 500, height: 500, crop: 'fill', gravity: 'face' }
    ],
  },
});

// File filter for images
const imageFileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and WEBP are allowed.'));
  }
};

// Upload middleware for event images
export const uploadEvent = multer({
  storage: eventStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: imageFileFilter
});

// Upload middleware for profile images
export const uploadProfile = multer({
  storage: profileStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit for profiles
  },
  fileFilter: imageFileFilter
});

// Default export for backward compatibility (events)
export const upload = uploadEvent;

export default cloudinary;
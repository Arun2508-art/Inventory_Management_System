// Uploads an image file
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ File type filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images (jpg, jpeg, png, webp) are allowed'));
  }
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    // folder: 'Test',
    use_filename: true,
    unique_filename: true,
    // overwrite: true,
  },
});

const multerOptions = {
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Max 5 MB per file
  },
  fileFilter,
};

const uploadSingleFile = multer(multerOptions).single('image');

const uploadMultipleFiles = multer(multerOptions).array('images', 5);

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
};

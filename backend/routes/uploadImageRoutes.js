const express = require('express');
const {
  uploadSingleImage,
  uploadMultipleImages,
  handleMulterErrors,
} = require('../controllers/uploadImageColudinary');
const {
  uploadSingleFile,
  uploadMultipleFiles,
} = require('../middleware/cloudinary');
const router = express.Router();

router.post('/file', handleMulterErrors(uploadSingleFile), uploadSingleImage);
router.post(
  '/files',
  handleMulterErrors(uploadMultipleFiles),
  uploadMultipleImages
);

module.exports = router;

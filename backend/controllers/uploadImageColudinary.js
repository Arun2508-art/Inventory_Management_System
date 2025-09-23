const multer = require('multer');

const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const data = { name: req.file.originalname, url: req.file.path };

    res.json({
      success: true,
      message: 'Single file uploaded successfully',
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Upload failed',
    });
  }
};

const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files uploaded' });
    }
    const data = req.files.map((file) => ({
      name: file.originalname,
      url: file.path,
    }));

    res.json({
      success: true,
      message: 'Multiple files uploaded successfully',
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Upload failed',
    });
  }
};

// Helper to handle Multer errors gracefully
const handleMulterErrors = (middleware) => {
  return (req, res, next) => {
    middleware(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  };
};

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
  handleMulterErrors,
};

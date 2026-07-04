const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dirs = {
  scriptFile: path.join(__dirname, '..', 'uploads', 'scripts'),
  thumbnail: path.join(__dirname, '..', 'uploads', 'thumbnails'),
  previewVideo: path.join(__dirname, '..', 'uploads', 'videos'),
};
Object.values(dirs).forEach(d => fs.mkdirSync(d, { recursive: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dirs[file.fieldname] || dirs.scriptFile),
  filename: (req, file, cb) => {
    const safeName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;
    cb(null, safeName);
  }
});

const MAX_SIZES = {
  scriptFile: 25 * 1024 * 1024,   // 25MB — script archives are just Lua/text
  thumbnail: 5 * 1024 * 1024,     // 5MB
  previewVideo: 100 * 1024 * 1024 // 100MB
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZES.previewVideo }, // multer applies one global limit; per-field checked below
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'scriptFile' && path.extname(file.originalname).toLowerCase() !== '.zip') {
      return cb(new Error('Script uploads must be a .zip file'));
    }
    if (file.fieldname === 'thumbnail' && !file.mimetype.startsWith('image/')) {
      return cb(new Error('Thumbnail must be an image'));
    }
    if (file.fieldname === 'previewVideo' && !file.mimetype.startsWith('video/')) {
      return cb(new Error('Preview must be a video'));
    }
    cb(null, true);
  }
});

module.exports = upload.fields([
  { name: 'scriptFile', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
  { name: 'previewVideo', maxCount: 1 },
]);

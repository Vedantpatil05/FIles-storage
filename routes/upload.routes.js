const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');

const upload = multer({ dest: 'uploads/' });

// Render upload form
router.get('/upload', auth, (req, res) => {
  res.render('upload', { success: false });
});

// Handle file upload
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    // ⛳ For now, just print file info
    console.log('✅ File received:', file.originalname);

    // Show success message
    res.render('upload', { success: true });
  } catch (error) {
    console.error('❌ Upload failed:', error);
    res.status(500).render('upload', { success: false });
  }
});

module.exports = router;

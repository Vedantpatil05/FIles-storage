const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/appwrite');
const auth = require('../middleware/auth'); // ✅ ADD THIS

const upload = multer({ dest: 'uploads/' });

// 🔒 GET route to show the upload form
router.get('/upload', auth, (req, res) => {
    res.render('upload', { success: false });
});

// 🔒 POST route to upload file
router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        const result = await storage.createFile(
            process.env.BUCKET_ID,
            file.originalname,
            file.path
        );

        // ✅ Render form again with success message
        res.render('upload', { success: true });
    } catch (error) {
        console.error(error);
        res.status(500).render('upload', { success: false });
    }
});

module.exports = router;

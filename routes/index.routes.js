const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/appwrite'); // Adjust the path to your appwrite config

const upload = multer({ dest: 'uploads/' });

router.get('/home', (req, res) => {
    res.render('home');
});

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const result = await storage.createFile(
            process.env.BUCKET_ID, 
            file.originalname,   // Use the original file name
            file.path             // The uploaded file path
        );

        res.status(200).json({ message: 'File uploaded successfully', fileId: result.$id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

module.exports = router;

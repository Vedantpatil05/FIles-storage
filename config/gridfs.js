
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017/your_database';
const conn = mongoose.createConnection(mongoURI);

let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Set up storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: 'uploads', // Collection name in MongoDB
            filename: `${Date.now()}-${file.originalname}`, // Unique filename
        };
    },
});

const upload = multer({ storage });

module.exports = { upload, gfs };

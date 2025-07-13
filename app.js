// 📁 app.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectToDB = require('./config/db');
connectToDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const userRoutes = require('./routes/user.routes');
const uploadRoutes = require('./routes/upload.routes'); // ✅ Add upload routes

app.use('/user', userRoutes);
app.use(uploadRoutes); // ✅ Register upload route without prefix

const auth = require('./middleware/auth');

app.get('/', (req, res) => {
  res.redirect('/user/login');
});

app.get('/home', auth, (req, res) => {
  res.render('home');
});

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
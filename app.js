const express = require('express');
const path = require('path');
const app = express();

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes

// Upload form page
app.get('/', (req, res) => {
  res.render('index', { success: false });
});

// Fake upload logic
app.post('/upload', (req, res) => {
  // Just show fake success message
  res.render('index', { success: true });
});

// Dashboard page with fake file list
app.get('/home', (req, res) => {
  res.render('home');
});

// Fallback route
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Page
router.get('/register', (req, res) => {
  res.render('register', { message: null });
});

// Register Logic
router.post('/register',
  body('email').trim().isEmail().isLength({ min: 10 }),
  body('password').trim().isLength({ min: 5 }),
  body('username').trim().isLength({ min: 4 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('register', { message: 'Invalid form data' });
    }

    const { username, email, password } = req.body;

    try {
      const userExists = await userModel.findOne({ $or: [{ email }, { username }] });

      if (userExists) {
        return res.status(400).render('register', { message: 'User already exists' });
      }

      const hashPass = bcrypt.hashSync(password, 10);
      const newUser = new userModel({ username, email, password: hashPass });
      await newUser.save();

      res.redirect('/user/login');
    } catch (err) {
      console.error(err);
      res.status(500).render('register', { message: 'Server error' });
    }
  }
);

// Login Page
router.get('/login', (req, res) => {
  res.render('login', { message: null });
});

// Login Logic
router.post('/login',
  body('username').trim().isLength({ min: 4 }),
  body('password').trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('login', { message: 'Invalid login credentials' });
    }

    const { username, password } = req.body;

    try {
      const user = await userModel.findOne({ username });

      if (!user) {
        return res.status(400).render('login', { message: 'Username or password incorrect' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).render('login', { message: 'Username or password incorrect' });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
          email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });

      res.redirect('/home');
    } catch (err) {
      console.error(err);
      res.status(500).render('login', { message: 'Server error during login' });
    }
  }
);

// Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/user/login');
});

module.exports = router;

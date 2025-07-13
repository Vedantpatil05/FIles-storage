const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.cookies.token;

  console.log('🔒 Checking for token in cookies...');
  if (!token) {
    console.log('❌ No token found. Redirecting to login.');
    return res.redirect('/user/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token verified. User:', decoded.username);
    req.user = decoded;
    next();
  } catch (e) {
    console.log('❌ Invalid token:', e.message);
    return res.redirect('/user/login');
  }
}

module.exports = auth;

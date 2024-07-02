const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.User.findOne({ where: { username } });

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;

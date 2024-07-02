const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { username } });
    if (!user) {
      console.log('User not found:', username);
      return res.status(404).send('User not found');
    }

    console.log('User found:', user.username);
    console.log('Stored password hash:', user.password);

    // Print the plain text password
    console.log('Plain text password:', password);

    // Correctly compare the plain text password with the hashed password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    console.log('Password comparison result:', passwordIsValid); // Log the comparison result
    if (!passwordIsValid) {
      console.log('Invalid password:', password);
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: 86400 }); // 24 hours
    res.status(200).send({ auth: true, token: token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});

module.exports = router;

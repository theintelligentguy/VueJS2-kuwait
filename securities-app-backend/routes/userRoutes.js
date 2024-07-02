const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models');
const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await db.User.create({
      username,
      password: hashedPassword
    });
    res.status(201).json({ message: 'User created successfully', user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Create user
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await db.User.create({
      username,
      password: hashedPassword
    });
    res.status(201).json({ message: 'User created successfully', user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Read users
router.get('/', async (req, res) => {
  try {
    const users = await db.User.findAll({ attributes: ['id', 'username'] });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (username) {
      user.username = username;
    }

    await user.save();
    res.json({ message: 'User updated successfully', user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

module.exports = router;

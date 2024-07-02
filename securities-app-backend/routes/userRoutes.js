const express = require('express');
const router = express.Router();
const db = require('../models');

// Create user
router.post('/', async (req, res) => {
  try {
    const user = await db.User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Read users
router.get('/', async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const user = await db.User.update(req.body, { where: { id: req.params.id } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    await db.User.destroy({ where: { id: req.params.id } });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await db.User.findAll();
    res.send(users);
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({ username, password: hashedPassword });
    res.send(user);
});

router.put('/:id', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.update({ username, password: hashedPassword }, { where: { id: req.params.id } });
    res.send(user);
});

router.delete('/:id', async (req, res) => {
    await db.User.destroy({ where: { id: req.params.id } });
    res.send({ message: 'User deleted' });
});

module.exports = router;

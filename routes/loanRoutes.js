const express = require('express');
const router = express.Router();
const LoanUser = require('../models/LoanUser');

// POST /api/air – Add user
router.post('/add', async (req, res) => {
    const { id, name, amount } = req.body;

    if (!id || !name || typeof amount !== 'number') {
        return res.status(400).json({ message: 'Invalid request data' });
    }

    try {
        const existing = await LoanUser.findOne({ id });
        if (existing) {
            return res.status(409).json({ message: 'User already exists. Use PUT to update.' });
        }

        const newUser = new LoanUser({ id, name, amount });
        await newUser.save();

        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error saving user', error });
    }
});

// PUT /api/air/:id – Edit user amount
router.put('/edit/:id', async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { amount } = req.body;

    if (typeof amount !== 'number') {
        return res.status(400).json({ message: 'Amount is required and must be a number' });
    }

    try {
        const user = await LoanUser.findOneAndUpdate(
            { id: userId },
            { amount },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User amount updated', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

// GET /api/air – Get all users
router.get('/list', async (req, res) => {
    try {
        const users = await LoanUser.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const TableData = require('../models/TableData');
const PrizeEntry = require('../models/PrizeEntry');
const Expense = require('../models/Expense');

// POST /api/air – Add user
router.post('/table', async (req, res) => {
    const data = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    const hasInvalid = data.some(item =>
        !item.tableName?.trim() || !item.tableNumber?.trim() || !item.tableAmount?.trim() || !item.userId || !item.username
    );

    if (hasInvalid) {
        return res.status(400).json({ error: 'All fields including userId are required' });
    }

    try {
        const saved = await TableData.insertMany(data);
        res.status(201).json({ message: 'Амжилттай хадгалагдлаа', saved });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Хадгалах үед алдаа гарлаа' });
    }
});

router.post('/prize', async (req, res) => {
    const data = req.body;
    const userId = req.query.userId || req.body.userId; // userId from query or body

    if (!userId || typeof data !== 'object') {
        return res.status(400).json({ error: 'userId and valid category data required' });
    }

    const entries = [];

    for (const category in data) {
        const rows = data[category];

        if (!Array.isArray(rows)) continue;

        rows.forEach((row) => {
            if (row.username?.trim() && row.amount?.trim()) {
                entries.push({
                    username: row.username.trim(),
                    amount: row.amount.trim(),
                    category,
                    userId,
                });
            }
        });
    }

    try {
        const saved = await PrizeEntry.insertMany(entries);
        res.status(201).json({ message: 'Амжилттай хадгалагдлаа', saved });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Хадгалах үед алдаа гарлаа' });
    }
});


router.post('/expense', async (req, res) => {
    const rows = req.body;
    const userId = req.query.userId || req.body.userId;

    if (!userId || !Array.isArray(rows)) {
        return res.status(400).json({ error: 'userId and valid array of rows are required' });
    }

    const invalid = rows.some(row =>
        !row.username?.trim() || !row.amount?.trim()
    );

    if (invalid) {
        return res.status(400).json({ error: 'All rows must have username and amount' });
    }

    const dataToInsert = rows.map(row => ({
        username: row.username.trim(),
        amount: row.amount.trim(),
        userId,
    }));

    try {
        const saved = await Expense.insertMany(dataToInsert);
        res.status(201).json({ message: 'Амжилттай хадгалагдлаа', saved });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Хадгалах үед алдаа гарлаа' });
    }
});

router.get('/table/list', async (req, res) => {
    try {
        const tables = await TableData.find();
        console.log(tables)
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tables', error });
    }
});

router.get('/prize/list', async (req, res) => {
    try {
        const prizes = await PrizeEntry.find();
        console.log(prizes)
        res.status(200).json(prizes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching prizes', error });
    }
});

router.get('/expense/list', async (req, res) => {
    try {
        const expenses = await Expense.find();
        console.log(expenses)
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error });
    }
});

router.get('/grouped-all', async (req, res) => {
    try {
        const grouped = await TableData.aggregate([
            {
                $addFields: {
                    dateOnly: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    }
                }
            },
            {
                $group: {
                    _id: { date: "$dateOnly", userId: "$userId", username: "$username" },
                    entries: {
                        $push: {
                            _id: "$_id",
                            tableName: "$tableName",
                            tableNumber: "$tableNumber",
                            tableAmount: "$tableAmount",
                            createdAt: "$createdAt"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$_id.date",
                    users: {
                        $push: {
                            userId: "$_id.userId",
                            username: "$_id.username",
                            entries: "$entries"
                        }
                    }
                }
            },
            { $sort: { _id: -1 } }
        ]);

        res.json(grouped);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Алдаа гарлаа' });
    }
});


router.get('/user-data', async (req, res) => {
    const { userId, date } = req.query;

    if (!userId || !date) {
        return res.status(400).json({ error: 'userId and date (YYYY-MM-DD) are required' });
    }

    try {
        // Parse date range for the full day
        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);

        // Run all 3 queries in parallel
        const [expenses, tables, prizes] = await Promise.all([
            Expense.find({
                userId,
                createdAt: { $gte: startOfDay, $lte: endOfDay },
            }),
            TableData.find({
                userId,
                createdAt: { $gte: startOfDay, $lte: endOfDay },
            }),
            PrizeEntry.find({
                userId,
                createdAt: { $gte: startOfDay, $lte: endOfDay },
            }),
        ]);

        res.json({
            date,
            userId,
            expenses,
            tables,
            prizes,
        });
    } catch (err) {
        console.error('❌ Error fetching user data:', err);
        res.status(500).json({ error: 'Алдаа гарлаа' });
    }
});

module.exports = router;
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    username: { type: String, required: true },
    amount: { type: String, required: true }, // or Number if numeric
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Expense', ExpenseSchema);

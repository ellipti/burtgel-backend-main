const mongoose = require('mongoose');

const TableDataSchema = new mongoose.Schema({
    tableName: { type: String, required: true },
    tableNumber: { type: String, required: true },
    tableAmount: { type: String, required: true },
    userId: { type: String, required: true }, // ✅ Add user ID
    username: { type: String, required: true }, // ✅ Add username
    createdAt: { type: Date, default: Date.now }, // ✅ Auto timestamp
});

module.exports = mongoose.model('TableData', TableDataSchema);
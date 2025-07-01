const mongoose = require('mongoose');

// Define User schema
const LoanUserSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
});

module.exports = mongoose.model('LoanUser', LoanUserSchema);
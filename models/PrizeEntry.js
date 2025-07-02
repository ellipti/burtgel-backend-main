const mongoose = require('mongoose');

const PrizeEntrySchema = new mongoose.Schema({
    username: { type: String, required: true },
    amount: { type: String, required: true },
    category: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PrizeEntry', PrizeEntrySchema);
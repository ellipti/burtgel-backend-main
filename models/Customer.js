// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  facebook: { type: String, required: true }, // ← нэмэх
  note: String,
  favourite: Boolean,
  blacklist: Boolean,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);
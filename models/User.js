// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true }, // ← нэмэх
  phone: String,
  password: String, // Хэрвээ login хийдэг бол
  role: {
    type: String,
    enum: ['admin', 'user', 'player'],
    default: 'user'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

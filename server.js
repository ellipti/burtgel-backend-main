const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express(); // ✅ ЭНЭГҮЙГЭЭР use() ажиллахгүй

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const loanRoutes = require('./routes/loanRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/loan', loanRoutes); // ✅ Энд байх ёстой
app.use('/api/auth', authRoutes); // ✅ Энд байх ёстой

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB локалд амжилттай холбогдлоо"))
  .catch((err) => console.error("❌ MongoDB алдаа:", err));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер ${PORT} порт дээр ажиллаж байна...`);
});

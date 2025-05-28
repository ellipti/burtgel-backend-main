const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const uname = username.toLowerCase();

  console.log('🔐 LOGIN ➤ Хэрэглэгч нэвтрэх гэж байна:', uname);
  console.log('🔗 AUTH ➤ Login fetch эхэлж байна...');

  
  try {
    // console.log(User.length);
    const user = await User.findOne({ username: uname });

    if (!user) {
      console.log('❌ AUTH ➤ Хэрэглэгч олдсонгүй:', uname);
      return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' });
    }

    console.log('✅ AUTH ➤ Хэрэглэгч олдлоо:', user.username, '| role:', user.role);
    // const hashedPassword = await bcrypt.hash(password, 10);

    // console.log(password)
    // console.log(hashedPassword)
    // console.log(user.password)

    if (user.role === 'player') {
      console.log('🚫 AUTH ➤ Тоглогч нэвтрэх эрхгүй');
      return res.status(403).json({ message: 'Тоглогч нэвтрэх эрхгүй' });
    }

    const isMatch = password == user.password;
    if (!isMatch) {
      console.log('❌ AUTH ➤ Нууц үг буруу');
      return res.status(401).json({ message: 'Нууц үг буруу' });
    }

    console.log('✅ AUTH ➤ Нэвтрэлт амжилттай:', user.username);
    return res.status(200).json({
      name: user.name,
      username: user.username,
      role: user.role
    });

  } catch (err) {
    console.error('💥 AUTH ➤ Сервер алдаа:', err.message);
    return res.status(500).json({ message: 'Серверийн алдаа' });
  }
});

module.exports = router;

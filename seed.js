// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('🔌 DB холбогдлоо, хэрэглэгч нэмэх гэж байна...');

    // Хуучин хэрэглэгчдийг цэвэрлэнэ
    await User.deleteMany({});

    // Нууц үг hash хийх
    const hashedPassword = await bcrypt.hash('1234', 10);

    // Админ хэрэглэгч үүсгэх
    await User.create({
      name: 'Админ',
      username: 'admin',
      password: '1234',
      role: 'admin'
    });

    await User.create({
      name: 'Hereglegch',
      username: 'user',
      password: '1234',
      role: 'user'
    });

    console.log('✅ admin хэрэглэгч амжилттай нэмэгдлээ!');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Алдаа:', err.message);
    process.exit(1);
  });

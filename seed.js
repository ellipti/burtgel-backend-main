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
      username: 'zolboo',
      password: 'zolboo9911',
      role: 'admin'
    });

    await User.create({
      name: 'Hereglegch',
      username: 'user1',
      password: '1234',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch',
      username: 'user1',
      password: '9900',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch',
      username: 'user2',
      password: '2211',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch',
      username: 'user3',
      password: '8808',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch',
      username: 'user4',
      password: '9515',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch',
      username: 'user5',
      password: '9969',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch',
      username: 'user6',
      password: '4321',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch',
      username: 'user7',
      password: '5678',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch',
      username: 'user8',
      password: '9876',
      role: 'user'
    });

     await User.create({
      name: 'Hereglegch',
      username: 'user9',
      password: '6543',
      role: 'user'
    });

     await User.create({
      name: 'Hereglegch',
      username: 'user10',
      password: '0987',
      role: 'user'
    });

    console.log('✅ admin хэрэглэгч амжилттай нэмэгдлээ!');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Алдаа:', err.message);
    process.exit(1);
  });

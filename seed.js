// seed.js
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('🔌 DB холбогдлоо, хэрэглэгч нэмэх гэж байна...');

    // Хуучин хэрэглэгчдийг цэвэрлэнэ
    await User.deleteMany({});

    // Админ хэрэглэгч үүсгэх
    await User.create({
      name: 'Админ',
      username: 'zolboo',
      password: 'zolboo9911',
      role: 'admin'
    });

    await User.create({
      name: 'Hereglegch1',
      username: 'user0',
      password: '1234',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch2',
      username: 'user1',
      password: '9900',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch3',
      username: 'user2',
      password: '2211',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch4',
      username: 'user3',
      password: '8808',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch5',
      username: 'user4',
      password: '9515',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch6',
      username: 'user5',
      password: '9969',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch7',
      username: 'user6',
      password: '4321',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch8',
      username: 'user7',
      password: '5678',
      role: 'user'
    });

    await User.create({
      name: 'Hereglegch9',
      username: 'user8',
      password: '9876',
      role: 'user'
    });

     await User.create({
      name: 'Hereglegch10',
      username: 'user9',
      password: '6543',
      role: 'user'
    });

     await User.create({
      name: 'Hereglegch11',
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

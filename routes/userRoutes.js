const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Customer = require('../models/Customer');

// POST - хэрэглэгч нэмэх
router.post('/', async (req, res) => {
  try {
    const { name, phone, facebook, note } = req.body;
    var customer = await Customer.create({
          name: name,
          phone: phone,
          facebook: facebook,
          note: note,
          favourite: false
        });
    customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/update', async (req, res) => {
  try {
    const { id, name, phone, facebook, note } = req.body;
    await Customer.findByIdAndUpdate(id, {
          name: name,
          phone: phone,
          facebook: facebook,
          note: note,
        });
    res.status(201).json({});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    await Customer.findByIdAndDelete(id);
    res.status(201).json({});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/favourite', async (req, res) => {
  try {
    const { id } = req.body;

    const user = await Customer.findOne(id);
    await Customer.updateOne(id, {favourite: user.favourite == true ? false : true});
    res.status(201).json({});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - role-оор шүүх боломжтой
router.get('/list', async (req, res) => {
  try {
    const users = await Customer.find();
    console.log(users)
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/admins', async (req, res) => {
  try {
    const users = await User.find();
    console.log(users)
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

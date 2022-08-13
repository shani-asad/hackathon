const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  idCard: { type: String, required: false },
  licence: { type: String, required: false },
});

module.exports = mongoose.model('Driver', driverSchema);

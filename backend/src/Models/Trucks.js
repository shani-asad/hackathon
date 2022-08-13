const mongoose = require('mongoose');

const TrucksSchema = new mongoose.Schema({
  licenceNumber: { type: String, required: true },
  licenceType: { type: String, required: true },
  truckType: { type: String, required: true },
  productionYear: { type: Number, required: false },
  stnk: { type: String, required: false },
  kir: { type: String, required: false },
});

module.exports = mongoose.model('Trucks', TrucksSchema);
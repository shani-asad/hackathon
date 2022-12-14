const mongoose = require('mongoose');

const TrucksSchema = new mongoose.Schema({
  licenceNumber: { type: String, required: true, unique: true },
  licenceType: { type: String, required: true },
  truckType: { type: String, required: true },
  productionYear: { type: Number, required: false },
  status: { type: String, default: 'active', required: true},
  stnk: { type: String, required: false },
  kir: { type: String, required: false },
});

TrucksSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

TrucksSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Trucks', TrucksSchema);
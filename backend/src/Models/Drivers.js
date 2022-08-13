const mongoose = require('mongoose');

const DriversSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true, unique: true },
  status: { type: String, default: 'active', required: true},
  createdAt: { type: Number, default: Date.now(), required: true },
  idCard: { type: String, required: false, unique: false },
  licence: { type: String, required: false, unique: false },
});

DriversSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

DriversSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Drivers', DriversSchema);
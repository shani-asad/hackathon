const mongoose = require('mongoose');

const DriversSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true, unique: true },
  idCard: { type: String, required: false, unique: true },
  licence: { type: String, required: false, unique: true },
});

DriversSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

DriversSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Drivers', DriversSchema);
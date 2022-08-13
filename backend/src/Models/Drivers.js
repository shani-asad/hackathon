const mongoose = require('mongoose');

const DriversSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  idCard: { type: String, required: false },
  licence: { type: String, required: false },
});

DriversSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

DriversSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Drivers', DriversSchema);
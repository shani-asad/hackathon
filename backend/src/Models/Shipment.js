const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  shipment_number: {type: String, required: true, unique: true },
  license: { type: String },
  driver: { type: String },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  loading_date: { type: Number, required: true },
  status: { type: String },
});

shipmentSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

shipmentSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Shipment', shipmentSchema);

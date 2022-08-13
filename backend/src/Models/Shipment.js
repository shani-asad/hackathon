const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  license: { type: String },
  driver: { type: String },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  loading_date: { type: Date, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model('Shipment', shipmentSchema);

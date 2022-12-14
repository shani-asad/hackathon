const mongoose = require('mongoose');

const TruckTypesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('TruckTypes', TruckTypesSchema);
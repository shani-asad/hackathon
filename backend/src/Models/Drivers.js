const mongoose = require('mongoose');

const DriversSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    idCard: { type: string, required: false },
    licence: { type: string, required: false }
});

module.exports = mongoose.model('Drivers', DriversSchema);

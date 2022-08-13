const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    licenceNumber: { type: String, required: true },
    licenceType: { type: String, required: true },
    truckType: { type: String, required: true },
    productionYear: { type: Number, required: false },
    stnk: { type: string, required: false },
    kir: { type: string, required: false }
});

module.exports = mongoose.model('Truck', truckSchema);

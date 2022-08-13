const mongoose = require('mongoose');
const Notes = require('../Models/Notes');
const bodyParser = require("body-parser");

const Trucks = require("../Models/Trucks");

const transGetTruck = async (req, res) => {
    const truck = res.json(await Trucks.find())
    return {
        success: true,
        data: truck
    }
}

const transGetTruckDetails = async (req, res) => {
    const truck = res.json(await Trucks.findById(req.params.id))
    return {
        success: true,
        data: truck
    }
}

const transAddTruck = async (req, res) => {
    if (await Trucks.findOne({ licenceNumber: req.body.licenceNumber })) {
        return res.json({ success: false, message: 'Licence number is already used!' })
    }

    let truck = new Trucks({
        licenceNumber: req.body.licenceNumber,
        licenceType: req.body.licenceType,
        truckType: req.body.truckType,
        productionYear: req.body.productionYear,
        stnk: req.body.stnk || null,
        kir: req.body.kir || null
    });

    truck = await truck.save()

    return res.json({
        success: true,
        data: {
            id: truck._id,
            licenceNumber: truck.licenceNumber,
            licenceType: truck.licenceType,
            truckType: truck.truckType,
            productionYear: truck.productionYear,
            stnk: truck.stnk || null,
            kir: truck.kir || null
        }
    });
}

const transUpdateTruck = async (req, res) => {
    const truck = res.json(await Trucks.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            returnOriginal: false,
        }
    ));

    return {
        success: true,
        data: truck
    }
}

module.exports = {
    transAddTruck,
    transGetTruck,
    transGetTruckDetails,
    transUpdateTruck
}
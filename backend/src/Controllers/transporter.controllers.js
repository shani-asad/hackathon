const mongoose = require('mongoose');

const Trucks = require("../Models/Trucks");
const Drivers = require("../Models/Drivers");

////////// TRUCKS //////////
const transGetTruck = async (req, res) => {
    const trucks = await Trucks.find()

    return res.json
        ({
            success: true,
            data: trucks
        })
}

const transGetTruckDetails = async (req, res) => {
    const truck = await Trucks.findById(req.params.id)
    return res.json
        ({
            success: true,
            data: truck
        })

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
        status: req.body.status || 'active',
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
            status: truck.status,
            stnk: truck.stnk,
            kir: truck.kir
        }
    });
}

const transUpdateTruck = async (req, res) => {
    const truck = await Trucks.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            returnOriginal: false,
        }
    );

    return res.json({
        success: true,
        data: truck
    })
}

////////// DRIVERS //////////
const transGetDriver = async (req, res) => {
    const driver = await Drivers.find()
    return res.json({
        success: true,
        data: driver
    })
}

const transGetDriverDetails = async (req, res) => {
    const driver = await Drivers.findById(req.params.id)
    return res.json({
        success: true,
        data: driver
    })
}

const transAddDriver = async (req, res) => {
    if (await Drivers.findOne({ phone: req.body.phone })) {
        return res.json({ success: false, message: 'Phone number is already used!' })
    }

    let driver = new Drivers({
        name: req.body.name,
        phone: req.body.phone,
        idCard: req.body.idCard || null,
        licence: req.body.licence || null
    });

    driver = await driver.save()

    return res.json({
        success: true,
        data: {
            id: driver._id,
            name: driver.name,
            phone: driver.phone,
            idCard: driver.idCard,
            licence: driver.licence
        }
    });
}

const transUpdateDriver = async (req, res) => {
    const driver = await Drivers.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            returnOriginal: false,
        }
    );

    return res.json({
        success: true,
        data: driver
    })
}

module.exports = {
    transAddTruck,
    transGetTruck,
    transGetTruckDetails,
    transUpdateTruck,
    transAddDriver,
    transGetDriver,
    transGetDriverDetails,
    transUpdateDriver
}
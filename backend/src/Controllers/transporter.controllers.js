const mongoose = require('mongoose');
const { BadRequest } = require('../Exceptions/Exceptions');
const ObjectId = require('mongoose').Types.ObjectId;

const Trucks = require("../Models/Trucks");
const TruckTypes = require("../Models/TruckTypes");
const Drivers = require("../Models/Drivers");

////////// TRUCK TYPES //////////
const transGetTruckTypes = async (req, res) => {
    const truckTypes = await TruckTypes.find()
    const data = []

    truckTypes.forEach((item) => {
        data.push(item.name)
    });

    return res.json({
        success: true,
        data
    })
}

const transAddTruckType = async (req, res) => {
    if (await TruckTypes.findOne({ name: req.body.name })) {
        return BadRequest(res, 'Truck type is already registered!')
    }

    let truckType = new TruckTypes({
        name: req.body.name,
    });

    truckType = await truckType.save()

    return res.json({
        success: true,
        data: {
            id: truckType._id,
            name: truckType.name
        }
    });
}

////////// TRUCKS //////////
const transGetTruck = async (req, res) => {
    const trucks = await Trucks.find()

    return res.json({
        success: true,
        data: trucks
    })
}

const transGetTruckDetails = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return BadRequest(res, `Id invalid`)
    }

    const truck = await Trucks.findById(req.params.id)

    if(!truck){
        return BadRequest(res, `Cannot find truck with id ${req.params.id}`)
    }

    return res.json({
        success: true,
        data: truck
    })

}

const validateLicenceType = (licenceType) => {
    const availableLicenceTypes = ['yellow', 'black']
    return availableLicenceTypes.includes(licenceType)
}

const transAddTruck = async (req, res) => {
    if (await Trucks.findOne({ licenceNumber: req.body.licenceNumber })) {
        return BadRequest(res, 'Licence number is already used!')
    }

    if (!validateLicenceType(req.body.licenceType)) {
        return BadRequest(res, 'Licence type is not valid!')
    }

    let truck = new Trucks({
        licenceNumber: req.body.licenceNumber,
        licenceType: req.body.licenceType.toLowerCase(),
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
    if(!ObjectId.isValid(req.params.id)){
        return BadRequest(res, `Id invalid`)
    }

    const driver = await Drivers.findById(req.params.id)

    if(!driver){
        return BadRequest(res, `Cannot find driver with id ${req.params.id}`)
    }

    return res.json({
        success: true,
        data: driver
    })
}

const transAddDriver = async (req, res) => {
    if (await Drivers.findOne({ phone: req.body.phone })) {
        return BadRequest(res, 'Phone number is already used!')
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
    transGetTruckTypes,
    transAddTruckType,
    transAddTruck,
    transGetTruck,
    transGetTruckDetails,
    transUpdateTruck,
    transAddDriver,
    transGetDriver,
    transGetDriverDetails,
    transUpdateDriver
}
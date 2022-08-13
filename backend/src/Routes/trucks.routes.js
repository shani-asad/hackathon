const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const Trucks = require("../Models/Trucks");

router.use(bodyParser.json());

router.get("/get", async (req, res) => {
    return res.json(await Trucks.find())
});

router.get("/get/:id", async (req, res) => {
    return res.json(await Trucks.findById(req.params.id))
});

router.post("/add", async (req, res) => {
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
        message: 'Trucks successfully registered',
        truck: {
            id: truck._id,
            licenceNumber: truck.licenceNumber,
            licenceType: truck.licenceType,
            truckType: truck.truckType,
            productionYear: truck.productionYear,
            stnk: truck.stnk || null,
            kir: truck.kir || null
        }
    });
});

router.put("/update/:id", async (req, res) => {
    return res.json(await Trucks.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            returnOriginal: false,
        }
    ));
});

router.delete("/delete/:id", async (req, res) => {
    return res.json(await Trucks.findByIdAndDelete(req.params.id));
});

module.exports = router;



const express = require('express')

const transporterControllers = require('../Controllers/transporter.controllers');

const router = express.Router();
//ticket1
router.post('/login', transporterControllers.transLogin);
//ticket2
router.get('/trucks', transporterControllers.transGetTruck);
router.get('/trucks/details', transporterControllers.GetTruckDetails);
//ticket3
router.post('addTrucks', transporterControllers.transAddTruck);
router.put('editTruck', transporterControllers.transUpdateTruck);
//ticket4
router.get('drivers',transporterControllers.transGetDriver);
router.get('/drivers/details', transporterControllers.transGetDriverDetails);
//ticket5
router.post('/addDriver',transporterControllers.transAddDriver);
router.put('/editDriver',transporterControllers.transUpdateDriver);




module.exports = router;
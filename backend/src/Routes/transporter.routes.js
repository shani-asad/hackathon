const express = require('express')

const transporterControllers = require('../Controllers/transporter.controllers');

const router = express.Router();
//ticket1
router.post('/login', transporterControllers.transLogin);
//ticket2
router.get('/trucks', transporterControllers.transGetTruck);
router.get('/trucks/details', transporterControllers.transGetTruckDetails);
//ticket3
router.post('addTrucks', transporterControllers.transAddTruck);
router.update('editTruck', transporterControllers.transUpdateTruck);
//ticket4


module.exports = router;
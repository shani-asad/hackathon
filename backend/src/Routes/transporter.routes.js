const express = require('express')
const bodyParser = require("body-parser");

const transporterControllers = require('../Controllers/transporter.controllers');

const router = express.Router();
router.use(bodyParser.json());

// some routes are commented because they don't have controller yet
//ticket1
// router.post('/login', transporterControllers.transLogin);
//ticket2
router.get('/trucks/get', transporterControllers.transGetTruck);
router.get('/trucks/get/:id', transporterControllers.transGetTruckDetails);
//ticket3
router.post('/trucks/add', transporterControllers.transAddTruck);
router.put('/trucks/update/:id', transporterControllers.transUpdateTruck);
//ticket4
// router.get('drivers',transporterControllers.transGetDriver);
// router.get('/drivers/details', transporterControllers.transGetDriverDetails);
// //ticket5
// router.post('/addDriver',transporterControllers.transAddDriver);
// router.put('/editDriver',transporterControllers.transUpdateDriver);




module.exports = router;
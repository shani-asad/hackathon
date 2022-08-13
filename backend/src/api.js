// DEPENDENCIES
const express = require('express');

const router = express.Router();

const transporterRouter = require('./Routes/transporter.routes');
const trucksRouter = require('./Routes/trucks.routes');

router.use('/user', transporterRouter);

const shipmentRouter = require('./Routes/user.routes');
router.use('/trucks', trucksRouter);

// RETURN ROUTER AS MODULE
module.exports = router;

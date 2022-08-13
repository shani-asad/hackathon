// DEPENDENCIES
const express = require('express');

const router = express.Router();

const userRouter = require('./Routes/user.routes');

router.use('/user', userRouter);

// const transporterRouter = require('./Routes/transporter.routes');

// router.use('/transporter', transporterRouter);

// const shipmentRouter = require('./Routes/shipment.routes');

// router.use('/shipment', shipmentRouter);

// RETURN ROUTER AS MODULE
module.exports = router;

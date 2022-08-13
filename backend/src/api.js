// DEPENDENCIES
const express = require('express');

const router = express.Router();

const transporterRouter = require('./Routes/transporter.routes');

router.use('/user', transporterRouter);

const shipmentRouter = require('./Routes/user.routes');

// RETURN ROUTER AS MODULE
module.exports = router;

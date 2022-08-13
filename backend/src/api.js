// DEPENDENCIES
const express = require('express');

const router = express.Router();

const notesRouter = require('./Routes/notes.routes');

router.use('/notes', notesRouter);

const transporterRouter = require('./Routes/transporter.routes')

router.use('/transporter', transporterRouter);

// RETURN ROUTER AS MODULE
module.exports = router;

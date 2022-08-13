// DEPENDENCIES
const express = require('express');

const router = express.Router();

const notesRouter = require('./Routes/notes.routes');
const trucksRouter = require('./Routes/trucks.routes');

router.use('/notes', notesRouter);
router.use('/trucks', trucksRouter);

// RETURN ROUTER AS MODULE
module.exports = router;

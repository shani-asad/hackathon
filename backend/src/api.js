// DEPENDENCIES
const express = require('express');

const router = express.Router();

const notesRouter = require('./Routes/notes.routes');

router.use('/notes', notesRouter);

// RETURN ROUTER AS MODULE
module.exports = router;

const express = require('express');

const notesControllers = require('../Controllers/notes.controllers');

const router = express.Router();

router.post('/add', notesControllers.notesPost);
router.get('/get', notesControllers.notesGet);

module.exports = router;

const express = require('express');

const usersControllers = require('../Controllers/users.controllers');

const router = express.Router();

router.post('/login', usersControllers.login);
router.get('/logout', usersControllers.logout);

module.exports = router;

const express = require('express');

const usersControllers = require('../Controllers/users.controllers');

const router = express.Router();

// some routes are commented because they don't have controller yet

// router.post('/login', usersControllers.login);
// router.get('/logout', usersControllers.logout);

module.exports = router;

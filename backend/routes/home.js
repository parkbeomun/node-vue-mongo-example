const express = require('express');
const router = express.Router();

const homeController = require('../controller/homeController');

router.post('/',homeController.login)

module.exports = router;
const express = require('express');
const canteenController = require('../controllers/canteen');

const router = express.Router();

router.get('/:foodOption', canteenController.countByFood);

module.exports = router;

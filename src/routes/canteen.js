const express = require('express');
const canteenController = require('../controllers/canteen');

const router = express.Router();

router.get('/', canteenController.countAllFoods);

router.get('/:foodOption', canteenController.countByFood);

module.exports = router;

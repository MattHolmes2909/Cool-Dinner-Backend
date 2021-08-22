const express = require('express');
const canteenController = require('../controllers/canteen');

const router = express.Router();

router.get('/', canteenController.countAllFoods);

router.get('/current', canteenController.countCurrentFoods);

router.get('/:foodOption', canteenController.countByFood);

router.get('/:foodOption/:schoolClass', canteenController.countByFoodAndClass);

module.exports = router;

const express = require('express');
const menuController = require('../controllers/menu');

const router = express.Router();

router.get('/', menuController.getAllFoods);

router.post('/', menuController.createFood);

router.delete('/:foodId', menuController.deleteFood);

module.exports = router;

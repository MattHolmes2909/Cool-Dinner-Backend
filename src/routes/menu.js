const express = require('express');
const menuController = require('../controllers/menu');

const router = express.Router();

router.get('/', menuController.getAllFoods);

router.get('/current', menuController.getCurrentFoods);

router.post('/', menuController.createFood);

router.patch('/editOptionNumbers', menuController.editOptionNumbers);

router.delete('/:foodId', menuController.deleteFood);

module.exports = router;

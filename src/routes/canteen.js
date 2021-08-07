const express = require('express');
const canteenController = require('../controllers/canteen');

const router = express.Router();

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

router.get('/', canteenController.countAllFoods);

router.get('/:foodOption', canteenController.countByFood);

router.get('/:foodOption/:schoolClass', canteenController.countByFoodAndClass);

module.exports = router;

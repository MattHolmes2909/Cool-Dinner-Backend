const express = require('express');
const childController = require('../controllers/child');

const router = express.Router();

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

router.post('/', childController.create);

router.get('/', childController.read);

router.get('/:childId', childController.readById);

router.get('/class/:schoolClass', childController.readByClass);

router.patch('/:childId', childController.update);

router.delete('/:childId', childController.delete);

module.exports = router;

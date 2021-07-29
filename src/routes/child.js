const express = require('express');
const childController = require('../controllers/child');

const router = express.Router();

router.post('/', childController.create);

router.get('/', childController.read);

router.get('/:childId', childController.readById);

router.get('/class/:schoolClass', childController.readByClass);

router.patch('/:childId', childController.update);

router.delete('/:childId', childController.delete);

module.exports = router;

const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.read);

router.get('/:userId', usersController.readById);

router.patch('/:userId', usersController.update);

router.delete('/:userId', usersController.delete);

module.exports = router;

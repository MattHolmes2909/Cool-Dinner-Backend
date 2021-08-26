const express = require('express');
const registerController = require('../controllers/register');

const router = express.Router();

router.post('/', registerController.create);

router.get('/pending', registerController.showPending);

router.post('/pending', registerController.createPending);

router.delete('/pending/:userId', registerController.deleteById);

module.exports = router;

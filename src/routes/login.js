const express = require('express');
const loginController = require('../controllers/login');

const router = express.Router();

router.post('/', loginController.login);

router.get('/', loginController.isUserAuth);

module.exports = router;

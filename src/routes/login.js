const express = require('express');
const loginController = require('../controllers/login');

const router = express.Router();

router.post('/', loginController.login);

router.get('/isUserAuth', loginController.isUserAuth);

module.exports = router;

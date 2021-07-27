const express = require('express');
const childController = require('../controllers/child');

const router = express.Router();

router.post('/', childController.create);

module.exports = router;

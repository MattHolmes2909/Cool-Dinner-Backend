const express = require('express');
const loginController = require('../controllers/login');

const router = express.Router();

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

router.post('/', loginController.login);

module.exports = router;

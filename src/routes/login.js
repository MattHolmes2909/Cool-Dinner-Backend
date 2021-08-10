const express = require('express');
const jwt = require('jsonwebtoken');
const loginController = require('../controllers/login');

const router = express.Router();

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.send('No token provided.');
  } else {
    jwt.verify(token, 'jwtSecret', (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: 'Failed to authenticate.' });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

router.post('/', loginController.login);

router.get('/isUserAuth', verifyJWT, loginController.isUserAuth);

module.exports = router;

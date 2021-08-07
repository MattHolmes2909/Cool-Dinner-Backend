const express = require('express');
const cors = require('cors');
const childRouter = require('./routes/child');
const canteenRouter = require('./routes/canteen');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());

app.use('/child', childRouter);

app.use('/canteen', canteenRouter);

app.use('/register', registerRouter);

app.use('/login', loginRouter);

module.exports = app;

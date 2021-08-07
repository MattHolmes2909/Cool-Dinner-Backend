const express = require('express');
const childRouter = require('./routes/child');
const canteenRouter = require('./routes/canteen');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

const app = express();

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

app.use('/child', childRouter);

app.use('/canteen', canteenRouter);

app.use('/register', registerRouter);

app.use('/login', loginRouter);

module.exports = app;

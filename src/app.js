const express = require('express');
const childRouter = require('./routes/child');
const canteenRouter = require('./routes/canteen');
// const registerRouter = require('./routes/register');
// const loginRouter = require('./routes/login');

const app = express(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use('/child', childRouter);

app.use('/canteen', canteenRouter);

// app.use('/register', registerRouter);

// app.use('/login', loginRouter);

module.exports = app;

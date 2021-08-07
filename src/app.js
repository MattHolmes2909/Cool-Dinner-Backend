const express = require('express');
const childRouter = require('./routes/child');
const canteenRouter = require('./routes/canteen');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/child', childRouter);

app.use('/canteen', canteenRouter);

module.exports = app;

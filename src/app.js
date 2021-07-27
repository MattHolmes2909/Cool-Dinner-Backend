const express = require('express');
const childRouter = require('./routes/child');
const canteenRouter = require('./routes/canteen');

const app = express();

app.use(express.json());

app.use('/child', childRouter);

app.use('/canteen', canteenRouter);

module.exports = app;

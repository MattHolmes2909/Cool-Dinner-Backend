const express = require('express');
const cors = require('cors');
const childRouter = require('./routes/child');
const canteenRouter = require('./routes/canteen');
const registerRouter = require('./routes/register');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/child', childRouter);

app.use('/canteen', canteenRouter);

app.use('/register', registerRouter);

module.exports = app;

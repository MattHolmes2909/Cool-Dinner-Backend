const express = require('express');
const childRouter = require('./routes/child');

const app = express();

app.use(express.json());

app.use('/child', childRouter);

module.exports = app;

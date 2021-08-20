const express = require('express');
const cors = require('cors');
const childRouter = require('./routes/child');
const canteenRouter = require('./routes/canteen');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

const app = express();

app.use(
  cors({
    allowedHeaders: '*', // you can change the headers
    exposedHeaders: '*', // you can change the headers
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  })
);

app.use(express.json());

app.use('/child', childRouter);

app.use('/canteen', canteenRouter);

app.use('/users', usersRouter);

app.use('/register', registerRouter);

app.use('/login', loginRouter);

module.exports = app;

const express = require('express');
const cors = require('cors');
const childRouter = require('./routes/child');
const canteenRouter = require('./routes/canteen');
// const registerRouter = require('./routes/register');
// const loginRouter = require('./routes/login');

const app = express(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/child', childRouter);

app.use('/canteen', canteenRouter);

// app.use('/register', registerRouter);

// app.use('/login', loginRouter);

module.exports = app;

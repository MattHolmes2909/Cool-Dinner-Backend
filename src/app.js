const express = require('express');
<<<<<<< HEAD
const cors = require('cors');
const childRouter = require('./routes/child');
const canteenRouter = require('./routes/canteen');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

const app = express(express.json());

app.use(cors());
=======
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
>>>>>>> refs/remotes/origin/main

app.use('/child', childRouter);

app.use('/canteen', canteenRouter);

<<<<<<< HEAD
app.use('/register', registerRouter);

app.use('/login', loginRouter);

=======
>>>>>>> refs/remotes/origin/main
module.exports = app;

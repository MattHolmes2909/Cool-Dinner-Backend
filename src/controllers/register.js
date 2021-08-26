const getDb = require('../services/db');
const bcrypt = require('bcryptjs');

exports.create = async (req, res, next) => {
  const db = await getDb();

  const { username, password, schoolClass, userType } = req.body;
  try {
    const [row] = await db.execute('SELECT * FROM users WHERE username=?', [
      username,
    ]);

    if (row.length >= 1) {
      res.send('This username already in use.').sendStatus(500);
    }

    if (password.length < 8) {
      res
        .send(
          'This password is too short. It must be at least 8 characters long.'
        )
        .sendStatus(500);
    }

    const hashPass = await bcrypt.hash(password, 12);

    const [rows] = await db.execute(
      'INSERT INTO users(username, password, schoolClass, userType) VALUES(?, ?, ?, ?)',
      [username, hashPass, schoolClass, userType]
    );

    if (rows.affectedRows !== 1) {
      res.send('Your registration has failed.').sendStatus(500);
    }

    res.send('You have successfully registered.').sendStatus(201);
  } catch (error) {
    next(error);
  }
  db.close();
};

exports.showPending = async (_, res) => {
  const db = await getDb();

  try {
    const [users] = await db.query('SELECT * FROM pending ORDER BY username');

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};

exports.createPending = async (req, res, next) => {
  const db = await getDb();

  const { username, password, schoolClass, userType } = req.body;
  try {
    const [row] = await db.execute('SELECT * FROM users WHERE username=?', [
      username,
    ]);

    const [rowPending] = await db.execute(
      'SELECT * FROM pending WHERE username=?',
      [username]
    );

    if (row.length >= 1 || rowPending.length >= 1) {
      res.send('This username already in use.').sendStatus(500);
    }

    if (password.length < 8) {
      res
        .send(
          'This password is too short. It must be at least 8 characters long.'
        )
        .sendStatus(500);
    }

    const hashPass = await bcrypt.hash(password, 12);

    const [rows] = await db.execute(
      'INSERT INTO pending(username, password, schoolClass, userType) VALUES(?, ?, ?, ?)',
      [username, hashPass, schoolClass, userType]
    );

    if (rows.affectedRows !== 1) {
      res.send('Your registration has failed.').sendStatus(500);
    }

    res.send('You have successfully registered.').sendStatus(201);
  } catch (error) {
    next(error);
  }
  db.close();
};

exports.addToUsers = async (req, res, next) => {
  const db = await getDb();

  const { userId } = req.parameters;
  try {
    await db.execute('INSERT INTO users SELECT * FROM pending WHERE id=?', [
      userId,
    ]);

    await db.execute('DELETE FROM pending WHERE id=?', [userId]);

    res.send('User has been added.').sendStatus(201);
  } catch (error) {
    next(error);
  }
  db.close();
};

exports.deleteById = async (req, res) => {
  const db = await getDb();
  const { userId } = req.params;

  try {
    const [{ affectedRows }] = await db.query(
      'DELETE FROM pending WHERE id = ?',
      [userId]
    );

    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.status(200).json(affectedRows);
    }
  } catch (err) {
    res.sendStatus(500);
  }

  db.close();
};

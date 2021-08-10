const getDb = require('../services/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const db = await getDb();
  const { username, password } = req.body;

  try {
    const [row] = await db.query('SELECT * FROM users WHERE username=?', [
      username,
    ]);

    if (row.length === 0) {
      res.json({ auth: false, message: 'Invalid username.' });
    }

    const checkPass = await bcrypt.compare(password, row[0].password);

    if (checkPass === false) {
      res.json({ auth: false, message: 'Wrong password.' });
    } else {
      const id = row[0].id;
      const token = jwt.sign({ id }, 'jwtSecret', {
        expiresIn: 3600,
      }); //jwtSecret would normally be replaced with dotenv var.
      res.json({
        auth: true,
        message: 'Logged in.',
        token: token,
      });
    }
  } catch (err) {
    res.sendStatus(500).json(err);
    res.json({ auth: false, message: 'Server issues.' });
    console.log(err);
  }
  db.close();
};

exports.isUserAuth = async (req, res) => {
  const db = await getDb();

  try {
    res.send('You are authenticated!');
  } catch (err) {
    res.sendStatus(500).json(err);
    res.json({ auth: false, message: 'Server issues.' });
    console.log(err);
  }
  db.close();
};

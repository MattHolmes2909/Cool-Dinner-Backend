const getDb = require('../services/db');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const db = await getDb();
  const { username, password } = req.body;

  try {
    const [row] = await db.query('SELECT * FROM users WHERE username=?', [
      username,
    ]);

    if (row.length === 0) {
      res.send('Invalid username.').sendStatus(500);
    }

    const checkPass = await bcrypt.compare(password, row[0].password);

    if (checkPass === false) {
      res.send('Password is incorrect.').sendStatus(500);
    } else {
      res.send('Login successful.').sendStatus(201);
    }
  } catch (err) {
    res.sendStatus(500).json(err);
    console.log(err);
  }
  db.close();
};

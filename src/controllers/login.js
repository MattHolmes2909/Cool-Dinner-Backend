const getDb = require('../services/db');

exports.login = async (req, res) => {
  const db = await getDb();
  const { username, password } = req.body;

  try {
    const [row] = await db.execute(
      'SELECT * FROM users WHERE username=? AND password=?',
      [username, password]
    );

    if (row.length === 0) {
      res.send('Username and/or password is incorrect.').sendStatus(500);
    } else {
      res.send('Login successful.').sendStatus(201);
    }
  } catch (err) {
    res.sendStatus(500).json(err);
    console.log(err);
  }
  db.close();
};

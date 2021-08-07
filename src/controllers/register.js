const getDb = require('../services/db');

exports.create = async (req, res) => {
  const db = await getDb();
  const { username, password, userType, schoolClass } = req.body;

  try {
    const [row] = await db.execute('SELECT * FROM users WHERE username=?', [
      username,
    ]);

    if (row.length > 0) {
      res.send('Username already exists!').sendStatus(500);
    } else {
      await db.query(
        'INSERT INTO users (username, password, userType, schoolClass) VALUES (?, ?, ?, ?)',
        [username, password, userType, schoolClass]
      );
      res.sendStatus(201);
    }
  } catch (err) {
    res.sendStatus(500).json(err);
    console.log(err);
  }
  db.close();
};

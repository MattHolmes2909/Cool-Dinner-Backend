const getDb = require('../services/db');

exports.create = async (req, res) => {
  const db = await getDb();
  const { username, password, userType, schoolClass } = req.body;

  try {
    await db.query(
      'INSERT INTO users (username, password, userType, schoolClass) VALUES (?, ?, ?, ?)',
      [username, password, userType, schoolClass]
    );
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500).json(err);
    console.log(err);
  }
  db.close();
};

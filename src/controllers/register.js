const getDb = require('../services/db');

exports.create = async (req, res) => {
  const db = await getDb();
  const { username, password, schoolClass, userType } = req.body;

  try {
    await db.query(
      'INSERT INTO users (username, password, schoolClass, userType) VALUES (?, ?)',
      [username, password, schoolClass, userType]
    );
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500).json(err);
    console.log(err);
  }
  db.close();
};

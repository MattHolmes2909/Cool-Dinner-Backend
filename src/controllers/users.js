const getDb = require('../services/db');

exports.read = async (_, res) => {
  const db = await getDb();

  try {
    const [users] = await db.query('SELECT * FROM users');

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};

exports.readById = async (req, res) => {
  const db = await getDb();
  const { userId } = req.params;

  const [[user]] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);

  if (!user) {
    res.sendStatus(404);
  } else {
    res.status(200).json(user);
  }

  db.close();
};

exports.update = async (req, res) => {
  const db = await getDb();
  const { userId } = req.params;
  const data = req.body;

  try {
    const [{ affectedRows }] = await db.query(
      'UPDATE users SET ? WHERE id = ?',
      [data, userId]
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

exports.delete = async (req, res) => {
  const db = await getDb();
  const { userId } = req.params;

  try {
    const [{ affectedRows }] = await db.query(
      'DELETE FROM users WHERE id = ?',
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

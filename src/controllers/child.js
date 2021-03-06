const getDb = require('../services/db');

exports.create = async (req, res) => {
  const db = await getDb();
  const { childName, schoolClass, foodOption, allergies } = req.body;

  try {
    await db.query(
      'INSERT INTO child (childName, schoolClass, foodOption, allergies) VALUES (?, ?, ?, ?)',
      [childName, schoolClass, foodOption, allergies]
    );
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500).json(err);
    console.log(err);
  }
  db.close();
};

exports.read = async (_, res) => {
  const db = await getDb();

  try {
    const [children] = await db.query(
      'SELECT * FROM child ORDER BY schoolClass, childName'
    );

    res.status(200).json(children);
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};

exports.readById = async (req, res) => {
  const db = await getDb();
  const { childId } = req.params;

  const [[child]] = await db.query('SELECT * FROM child WHERE id = ?', [
    childId,
  ]);

  if (!child) {
    res.sendStatus(404);
  } else {
    res.status(200).json(child);
  }

  db.close();
};

exports.readByClass = async (req, res) => {
  const db = await getDb();
  const { schoolClass } = req.params;

  try {
    const [children] = await db.query(
      'SELECT * FROM child WHERE schoolClass=? ORDER BY childName',
      [schoolClass]
    );

    res.status(200).json(children);
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};

exports.updateMany = async (req, res) => {
  const db = await getDb();
  const data = req.body;

  try {
    for (let i = 0; i < data.newOrders.length; i++) {
      await db.query('UPDATE child SET foodOption = ? WHERE id = ?', [
        data.newOrders[i].foodOption,
        data.newOrders[i].id,
      ]);
    }
  } catch (error) {
    res.sendStatus(500).json(error);
  } finally {
    res.status(200).send('Success!');
  }

  db.close();
};

exports.update = async (req, res) => {
  const db = await getDb();
  const { childId } = req.params;
  const data = req.body;

  try {
    const [{ affectedRows }] = await db.query(
      'UPDATE child SET ? WHERE id = ?',
      [data, childId]
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
  const { childId } = req.params;

  try {
    const [{ affectedRows }] = await db.query(
      'DELETE FROM child WHERE id = ?',
      [childId]
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

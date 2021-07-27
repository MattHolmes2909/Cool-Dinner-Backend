const getDb = require('../services/db');

exports.create = async (req, res) => {
  const db = await getDb();
  const { childName, schoolClass, foodOption } = req.body;

  try {
    await db.query(
      `INSERT INTO child (childName, schoolClass, foodOption) VALUES ('${childName}', '${schoolClass}', '${foodOption}')`
    );
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500).json(err);
  }
  db.close();
};

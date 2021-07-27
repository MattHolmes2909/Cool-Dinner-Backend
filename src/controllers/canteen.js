const getDb = require('../services/db');

exports.countByFood = async (req, res) => {
  const db = await getDb();
  const { foodOption } = req.params;

  const [[foodCount]] = await db.query(
    'SELECT COUNT(*) FROM child WHERE foodOption = ?',
    [foodOption]
  );

  if (!foodOption) {
    res.sendStatus(404);
  } else {
    res.status(200).json(foodCount);
  }

  db.close();
};

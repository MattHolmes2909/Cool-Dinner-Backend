const getDb = require('../services/db');

exports.countAllFoods = async (_, res) => {
  const db = await getDb();

  const [[pasta]] = await db.query(
    'SELECT COUNT(*) FROM child WHERE foodOption = ?',
    ['pasta']
  );

  const [[quorn]] = await db.query(
    'SELECT COUNT(*) FROM child WHERE foodOption = ?',
    ['quorn']
  );

  const [[fish]] = await db.query(
    'SELECT COUNT(*) FROM child WHERE foodOption = ?',
    ['fish']
  );

  const [[none]] = await db.query(
    'SELECT COUNT(*) FROM child WHERE foodOption = ?',
    ['none']
  );

  res.status(200).json({ pasta: pasta, quorn: quorn, fish: fish, none: none });

  db.close();
};

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

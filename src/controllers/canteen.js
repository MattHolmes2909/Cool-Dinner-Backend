const getDb = require('../services/db');

exports.countAllFoods = async (_, res) => {
  const db = await getDb();

  const [[pizza]] = await db.query(
    'SELECT COUNT(*) FROM child WHERE foodOption = ?',
    ['pizza']
  );

  const [[pasta]] = await db.query(
    'SELECT COUNT(*) FROM child WHERE foodOption = ?',
    ['pasta']
  );

  const [[fish]] = await db.query(
    'SELECT COUNT(*) FROM child WHERE foodOption = ?',
    ['fish']
  );

  const [[quorn]] = await db.query(
    'SELECT COUNT(*) FROM child WHERE foodOption = ?',
    ['quorn']
  );

  const [[none]] = await db.query(
    'SELECT COUNT(*) FROM child WHERE foodOption = ?',
    ['none']
  );

  res
    .status(200)
    .json({ pizza: pizza, pasta: pasta, fish: fish, quorn: quorn, none: none });

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

exports.countByFoodAndClass = async (req, res) => {
  const db = await getDb();
  const { foodOption, schoolClass } = req.params;

  const [[foodCount]] = await db.query(
    'SELECT COUNT(*) FROM child WHERE foodOption = ? AND schoolClass = ?',
    [foodOption, schoolClass]
  );

  if (!foodOption || !schoolClass) {
    res.sendStatus(404);
  } else {
    res.status(200).json(foodCount);
  }

  db.close();
};

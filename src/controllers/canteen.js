const getDb = require('../services/db');

exports.countAllFoods = async (_, res) => {
  const db = await getDb();

  const [[pizza]] = await db.query(
    'SELECT COUNT(*) as totalPizza FROM child WHERE foodOption = ?',
    ['pizza']
  );

  const [[pasta]] = await db.query(
    'SELECT COUNT(*) as totalPasta FROM child WHERE foodOption = ?',
    ['pasta']
  );

  const [[fish]] = await db.query(
    'SELECT COUNT(*) as totalFish FROM child WHERE foodOption = ?',
    ['fish']
  );

  const [[quorn]] = await db.query(
    'SELECT COUNT(*) as totalQuorn FROM child WHERE foodOption = ?',
    ['quorn']
  );

  const [[none]] = await db.query(
    'SELECT COUNT(*) as totalNone FROM child WHERE foodOption = ?',
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

  const [[foodCount1DS]] = await db.query(
    'SELECT COUNT(*) as total1DS FROM child WHERE foodOption = ? AND schoolClass=?',
    [foodOption, '1DS']
  );

  const [[foodCount1MH]] = await db.query(
    'SELECT COUNT(*) as total1MH FROM child WHERE foodOption = ? AND schoolClass=?',
    [foodOption, '1MH']
  );

  const [[foodCount2AW]] = await db.query(
    'SELECT COUNT(*) as total2AW FROM child WHERE foodOption = ? AND schoolClass=?',
    [foodOption, '2AW']
  );

  const [[foodCount2NM]] = await db.query(
    'SELECT COUNT(*) as total2NM FROM child WHERE foodOption = ? AND schoolClass=?',
    [foodOption, '2NM']
  );

  if (!foodOption) {
    res.sendStatus(404);
  } else {
    res.status(200).json({
      total1DS: foodCount1DS,
      total1MH: foodCount1MH,
      total2AW: foodCount2AW,
      total2NM: foodCount2NM,
    });
  }

  db.close();
};

exports.countByFoodAndClass = async (req, res) => {
  const db = await getDb();
  const { foodOption, schoolClass } = req.params;

  const [[foodCount]] = await db.query(
    'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
    [foodOption, schoolClass]
  );

  if (!foodOption || !schoolClass) {
    res.sendStatus(404);
  } else {
    res.status(200).json(foodCount);
  }

  db.close();
};

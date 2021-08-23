const getDb = require('../services/db');

exports.getAllFoods = async (_, res) => {
  const db = await getDb();

  try {
    const [menu] = await db.query('SELECT * FROM menu');

    res.status(200).json(menu);
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};

exports.getCurrentFoods = async (_, res) => {
  const db = await getDb();

  let currentMenu = {
    optionOne: '',
    optionTwo: '',
    optionThree: '',
    optionFour: '',
  };

  [[currentMenu.optionOne]] = await db.query(
    'SELECT * FROM menu WHERE foodOptionNum = ?',
    [1]
  );
  [[currentMenu.optionTwo]] = await db.query(
    'SELECT * FROM menu WHERE foodOptionNum = ?',
    [2]
  );
  [[currentMenu.optionThree]] = await db.query(
    'SELECT * FROM menu WHERE foodOptionNum = ?',
    [3]
  );
  [[currentMenu.optionFour]] = await db.query(
    'SELECT * FROM menu WHERE foodOptionNum = ?',
    [4]
  );
  res.status(200).json(currentMenu);

  db.close();
};

exports.createFood = async (req, res) => {
  const db = await getDb();
  const { foodName, value, foodOptionNum, allergens, dietary } = req.body;

  try {
    await db.query(
      'INSERT INTO menu (foodName, value, foodOptionNum, allergens, dietary) VALUES (?, ?, ?, ?, ?)',
      [foodName, value, foodOptionNum, allergens, dietary]
    );
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500).json(err);
    console.log(err);
  }
  db.close();
};

exports.deleteFood = async (req, res) => {
  const db = await getDb();
  const { foodId } = req.params;

  try {
    const [{ affectedRows }] = await db.query('DELETE FROM menu WHERE id = ?', [
      foodId,
    ]);

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

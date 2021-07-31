const getDb = require('../services/db');

exports.countAllFoods = async (_, res) => {
  const db = await getDb();

  let pizza = {
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [[totalPizza]] = await db.query(
    'SELECT COUNT(*) as totalPizza FROM child WHERE foodOption = ?',
    ['pizza']
  );

  const [[totalPizza1DS]] = await db.query(
    'SELECT COUNT(*) as total1DS FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['pizza', '1DS']
  );

  const [[totalPizza1MH]] = await db.query(
    'SELECT COUNT(*) as total1MH FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['pizza', '1MH']
  );

  const [[totalPizza2AW]] = await db.query(
    'SELECT COUNT(*) as total2AW FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['pizza', '2AW']
  );

  const [[totalPizza2NM]] = await db.query(
    'SELECT COUNT(*) as total2NM FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['pizza', '2NM']
  );

  pizza.total = totalPizza.totalPizza;
  pizza.total1DS = totalPizza1DS.total1DS;
  pizza.total1MH = totalPizza1MH.total1MH;
  pizza.total2AW = totalPizza2AW.total2AW;
  pizza.total2NM = totalPizza2NM.total2NM;

  // pasta

  let pasta = {
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [[totalPasta]] = await db.query(
    'SELECT COUNT(*) as totalPasta FROM child WHERE foodOption = ?',
    ['pasta']
  );

  const [[totalPasta1DS]] = await db.query(
    'SELECT COUNT(*) as total1DS FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['pasta', '1DS']
  );

  const [[totalPasta1MH]] = await db.query(
    'SELECT COUNT(*) as total1MH FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['pasta', '1MH']
  );

  const [[totalPasta2AW]] = await db.query(
    'SELECT COUNT(*) as total2AW FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['pasta', '2AW']
  );

  const [[totalPasta2NM]] = await db.query(
    'SELECT COUNT(*) as total2NM FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['pasta', '2NM']
  );

  pasta.total = totalPasta.totalPasta;
  pasta.total1DS = totalPasta1DS.total1DS;
  pasta.total1MH = totalPasta1MH.total1MH;
  pasta.total2AW = totalPasta2AW.total2AW;
  pasta.total2NM = totalPasta2NM.total2NM;

  // fish

  let fish = {
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [[totalFish]] = await db.query(
    'SELECT COUNT(*) as totalFish FROM child WHERE foodOption = ?',
    ['fish']
  );

  const [[totalFish1DS]] = await db.query(
    'SELECT COUNT(*) as total1DS FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['fish', '1DS']
  );

  const [[totalFish1MH]] = await db.query(
    'SELECT COUNT(*) as total1MH FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['fish', '1MH']
  );

  const [[totalFish2AW]] = await db.query(
    'SELECT COUNT(*) as total2AW FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['fish', '2AW']
  );

  const [[totalFish2NM]] = await db.query(
    'SELECT COUNT(*) as total2NM FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['fish', '2NM']
  );

  fish.total = totalFish.totalFish;
  fish.total1DS = totalFish1DS.total1DS;
  fish.total1MH = totalFish1MH.total1MH;
  fish.total2AW = totalFish2AW.total2AW;
  fish.total2NM = totalFish2NM.total2NM;

  // quorn

  let quorn = {
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [[totalQuorn]] = await db.query(
    'SELECT COUNT(*) as totalPizza FROM child WHERE foodOption = ?',
    ['quorn']
  );

  const [[totalQuorn1DS]] = await db.query(
    'SELECT COUNT(*) as total1DS FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['quorn', '1DS']
  );

  const [[totalQuorn1MH]] = await db.query(
    'SELECT COUNT(*) as total1MH FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['quorn', '1MH']
  );

  const [[totalQuorn2AW]] = await db.query(
    'SELECT COUNT(*) as total2AW FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['quorn', '2AW']
  );

  const [[totalQuorn2NM]] = await db.query(
    'SELECT COUNT(*) as total2NM FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['quorn', '2NM']
  );

  quorn.total = totalQuorn.totalPizza;
  quorn.total1DS = totalQuorn1DS.total1DS;
  quorn.total1MH = totalQuorn1MH.total1MH;
  quorn.total2AW = totalQuorn2AW.total2AW;
  quorn.total2NM = totalQuorn2NM.total2NM;

  // none

  let none = {
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [[totalNone]] = await db.query(
    'SELECT COUNT(*) as totalPizza FROM child WHERE foodOption = ?',
    ['none']
  );

  const [[totalNone1DS]] = await db.query(
    'SELECT COUNT(*) as total1DS FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['none', '1DS']
  );

  const [[totalNone1MH]] = await db.query(
    'SELECT COUNT(*) as total1MH FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['none', '1MH']
  );

  const [[totalNone2AW]] = await db.query(
    'SELECT COUNT(*) as total2AW FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['none', '2AW']
  );

  const [[totalNone2NM]] = await db.query(
    'SELECT COUNT(*) as total2NM FROM child WHERE foodOption = ? AND schoolClass = ?',
    ['none', '2NM']
  );

  none.total = totalNone.totalPizza;
  none.total1DS = totalNone1DS.total1DS;
  none.total1MH = totalNone1MH.total1MH;
  none.total2AW = totalNone2AW.total2AW;
  none.total2NM = totalNone2NM.total2NM;

  res.status(200).json({ pizza, pasta, fish, quorn, none });

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

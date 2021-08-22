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

  const [
    [[totalPizza]],
    [[totalPizza1DS]],
    [[totalPizza1MH]],
    [[totalPizza2AW]],
    [[totalPizza2NM]],
  ] = [
    await db.query('SELECT COUNT(*) as total FROM child WHERE foodOption = ?', [
      'pizza',
    ]),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['pizza', '1DS']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['pizza', '1MH']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['pizza', '2AW']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['pizza', '2NM']
    ),
  ];

  pizza.total = totalPizza.total;
  pizza.total1DS = totalPizza1DS.total;
  pizza.total1MH = totalPizza1MH.total;
  pizza.total2AW = totalPizza2AW.total;
  pizza.total2NM = totalPizza2NM.total;

  // pasta

  let pasta = {
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [
    [[totalPasta]],
    [[totalPasta1DS]],
    [[totalPasta1MH]],
    [[totalPasta2AW]],
    [[totalPasta2NM]],
  ] = [
    await db.query('SELECT COUNT(*) as total FROM child WHERE foodOption = ?', [
      'pasta',
    ]),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['pasta', '1DS']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['pasta', '1MH']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['pasta', '2AW']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['pasta', '2NM']
    ),
  ];

  pasta.total = totalPasta.total;
  pasta.total1DS = totalPasta1DS.total;
  pasta.total1MH = totalPasta1MH.total;
  pasta.total2AW = totalPasta2AW.total;
  pasta.total2NM = totalPasta2NM.total;

  // fish

  let fish = {
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [
    [[totalFish]],
    [[totalFish1DS]],
    [[totalFish1MH]],
    [[totalFish2AW]],
    [[totalFish2NM]],
  ] = [
    await db.query('SELECT COUNT(*) as total FROM child WHERE foodOption = ?', [
      'fish',
    ]),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['fish', '1DS']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['fish', '1MH']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['fish', '2AW']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['fish', '2NM']
    ),
  ];

  fish.total = totalFish.total;
  fish.total1DS = totalFish1DS.total;
  fish.total1MH = totalFish1MH.total;
  fish.total2AW = totalFish2AW.total;
  fish.total2NM = totalFish2NM.total;

  // quorn

  let quorn = {
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [
    [[totalQuorn]],
    [[totalQuorn1DS]],
    [[totalQuorn1MH]],
    [[totalQuorn2AW]],
    [[totalQuorn2NM]],
  ] = [
    await db.query('SELECT COUNT(*) as total FROM child WHERE foodOption = ?', [
      'quorn',
    ]),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['quorn', '1DS']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['quorn', '1MH']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['quorn', '2AW']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['quorn', '2NM']
    ),
  ];

  quorn.total = totalQuorn.total;
  quorn.total1DS = totalQuorn1DS.total;
  quorn.total1MH = totalQuorn1MH.total;
  quorn.total2AW = totalQuorn2AW.total;
  quorn.total2NM = totalQuorn2NM.total;

  // none

  let none = {
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [
    [[totalNone]],
    [[totalNone1DS]],
    [[totalNone1MH]],
    [[totalNone2AW]],
    [[totalNone2NM]],
  ] = [
    await db.query('SELECT COUNT(*) as total FROM child WHERE foodOption = ?', [
      'none',
    ]),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['none', '1DS']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['none', '1MH']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['none', '2AW']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['none', '2NM']
    ),
  ];

  none.total = totalNone.total;
  none.total1DS = totalNone1DS.total;
  none.total1MH = totalNone1MH.total;
  none.total2AW = totalNone2AW.total;
  none.total2NM = totalNone2NM.total;

  res.status(200).json({ pizza, pasta, fish, quorn, none });

  db.close();
};

exports.countByFood = async (req, res) => {
  const db = await getDb();
  const { foodOption } = req.params;

  let food = {
    name: foodOption,
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [[[total]], [[total1DS]], [[total1MH]], [[total2AW]], [[total2NM]]] = [
    await db.query('SELECT COUNT(*) as total FROM child WHERE foodOption = ?', [
      foodOption,
    ]),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [foodOption, '1DS']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [foodOption, '1MH']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [foodOption, '2AW']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [foodOption, '2NM']
    ),
  ];

  food.total = total.total;
  food.total1DS = total1DS.total;
  food.total1MH = total1MH.total;
  food.total2AW = total2AW.total;
  food.total2NM = total2NM.total;

  if (!foodOption) {
    res.sendStatus(404);
  } else {
    res.status(200).json(food);
  }

  db.close();
};

exports.countCurrentFoods = async (_, res) => {
  const db = await getDb();

  let optionOne = {
    name: '',
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [optionOneName] = await db.query(
    'SELECT foodName, value FROM menu WHERE foodOptionNum = ?',
    [1]
  );

  const [
    [[totalOptionOne]],
    [[totalOptionOne1DS]],
    [[totalOptionOne1MH]],
    [[totalOptionOne2AW]],
    [[totalOptionOne2NM]],
  ] = [
    await db.query('SELECT COUNT(*) as total FROM child WHERE foodOption = ?', [
      optionOneName[0].value,
    ]),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionOneName[0].value, '1DS']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionOneName[0].value, '1MH']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionOneName[0].value, '2AW']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionOneName[0].value, '2NM']
    ),
  ];

  optionOne.name = optionOneName[0].foodName;
  optionOne.total = totalOptionOne.total;
  optionOne.total1DS = totalOptionOne1DS.total;
  optionOne.total1MH = totalOptionOne1MH.total;
  optionOne.total2AW = totalOptionOne2AW.total;
  optionOne.total2NM = totalOptionOne2NM.total;

  // pasta

  let optionTwo = {
    name: '',
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [optionTwoName] = await db.query(
    'SELECT foodName, value FROM menu WHERE foodOptionNum = ?',
    [2]
  );

  const [
    [[totalOptionTwo]],
    [[totalOptionTwo1DS]],
    [[totalOptionTwo1MH]],
    [[totalOptionTwo2AW]],
    [[totalOptionTwo2NM]],
  ] = [
    await db.query('SELECT COUNT(*) as total FROM child WHERE foodOption = ?', [
      optionTwoName[0].value,
    ]),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionTwoName[0].value, '1DS']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionTwoName[0].value, '1MH']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionTwoName[0].value, '2AW']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionTwoName[0].value, '2NM']
    ),
  ];

  optionTwo.name = optionTwoName[0].foodName;
  optionTwo.total = totalOptionTwo.total;
  optionTwo.total1DS = totalOptionTwo1DS.total;
  optionTwo.total1MH = totalOptionTwo1MH.total;
  optionTwo.total2AW = totalOptionTwo2AW.total;
  optionTwo.total2NM = totalOptionTwo2NM.total;

  // fish

  let optionThree = {
    name: '',
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [optionThreeName] = await db.query(
    'SELECT foodName, value FROM menu WHERE foodOptionNum = ?',
    [3]
  );

  const [
    [[totalOptionThree]],
    [[totalOptionThree1DS]],
    [[totalOptionThree1MH]],
    [[totalOptionThree2AW]],
    [[totalOptionThree2NM]],
  ] = [
    await db.query('SELECT COUNT(*) as total FROM child WHERE foodOption = ?', [
      optionThreeName[0].value,
    ]),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionThreeName[0].value, '1DS']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionThreeName[0].value, '1MH']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionThreeName[0].value, '2AW']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionThreeName[0].value, '2NM']
    ),
  ];
  optionThree.name = optionThreeName[0].foodName;
  optionThree.total = totalOptionThree.total;
  optionThree.total1DS = totalOptionThree1DS.total;
  optionThree.total1MH = totalOptionThree1MH.total;
  optionThree.total2AW = totalOptionThree2AW.total;
  optionThree.total2NM = totalOptionThree2NM.total;

  // quorn

  let optionFour = {
    name: '',
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [optionFourName] = await db.query(
    'SELECT foodName, value FROM menu WHERE foodOptionNum = ?',
    [4]
  );

  const [
    [[totalOptionFour]],
    [[totalOptionFour1DS]],
    [[totalOptionFour1MH]],
    [[totalOptionFour2AW]],
    [[totalOptionFour2NM]],
  ] = [
    await db.query('SELECT COUNT(*) as total FROM child WHERE foodOption = ?', [
      optionFourName[0].value,
    ]),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionFourName[0].value, '1DS']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionFourName[0].value, '1MH']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionFourName[0].value, '2AW']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [optionFourName[0].value, '2NM']
    ),
  ];

  optionFour.name = optionFourName[0].foodName;
  optionFour.total = totalOptionFour.total;
  optionFour.total1DS = totalOptionFour1DS.total;
  optionFour.total1MH = totalOptionFour1MH.total;
  optionFour.total2AW = totalOptionFour2AW.total;
  optionFour.total2NM = totalOptionFour2NM.total;

  // none

  let none = {
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [
    [[totalNone]],
    [[totalNone1DS]],
    [[totalNone1MH]],
    [[totalNone2AW]],
    [[totalNone2NM]],
  ] = [
    await db.query('SELECT COUNT(*) as total FROM child WHERE foodOption = ?', [
      'none',
    ]),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['none', '1DS']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['none', '1MH']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['none', '2AW']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      ['none', '2NM']
    ),
  ];

  none.total = totalNone.total;
  none.total1DS = totalNone1DS.total;
  none.total1MH = totalNone1MH.total;
  none.total2AW = totalNone2AW.total;
  none.total2NM = totalNone2NM.total;

  res.status(200).json({ optionOne, optionTwo, optionThree, optionFour, none });

  db.close();
};

exports.countByFood = async (req, res) => {
  const db = await getDb();
  const { foodOption } = req.params;

  let food = {
    name: foodOption,
    total: 0,
    total1DS: 0,
    total1MH: 0,
    total2AW: 0,
    total2NM: 0,
  };

  const [[[total]], [[total1DS]], [[total1MH]], [[total2AW]], [[total2NM]]] = [
    await db.query('SELECT COUNT(*) as total FROM child WHERE foodOption = ?', [
      foodOption,
    ]),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [foodOption, '1DS']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [foodOption, '1MH']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [foodOption, '2AW']
    ),
    await db.query(
      'SELECT COUNT(*) as total FROM child WHERE foodOption = ? AND schoolClass = ?',
      [foodOption, '2NM']
    ),
  ];

  food.total = total.total;
  food.total1DS = total1DS.total;
  food.total1MH = total1MH.total;
  food.total2AW = total2AW.total;
  food.total2NM = total2NM.total;

  if (!foodOption) {
    res.sendStatus(404);
  } else {
    res.status(200).json(food);
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

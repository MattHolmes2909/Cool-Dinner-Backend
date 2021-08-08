// const getDb = require('../services/db');

// exports.login = async (req, res) => {
//   const db = await getDb();
//   const { username, password } = await req.body;

//   try {
//     const [row] = await db.query('SELECT * FROM users WHERE username=?', [
//       username,
//     ]);

//     if (row.length === 0) {
//       res.send('Invalid username.').sendStatus(500);
//     }

//     if (password !== row[0].password) {
//       res.send('Password is incorrect.').sendStatus(500);
//     } else {
//       res.send('Login successful.').sendStatus(201);
//     }
//   } catch (err) {
//     res.sendStatus(500).json(err);
//     console.log(err);
//   }
//   db.close();
// };

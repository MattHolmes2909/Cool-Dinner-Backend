// const getDb = require('../services/db');

// exports.create = async (req, res, next) => {
//   const db = await getDb();

//   const { username, password, schoolClass, userType } = req.body;
//   try {
//     const [row] = await db.execute('SELECT * FROM users WHERE username=?', [
//       username,
//     ]);

//     if (row.length >= 1) {
//       res.send('This username already in use.').sendStatus(500);
//     }

//     if (password.length < 8) {
//       res
//         .send(
//           'This password is too short. It must be at least 8 characters long.'
//         )
//         .sendStatus(500);
//     }

//     const [rows] = await db.execute(
//       'INSERT INTO users(username, password, schoolClass, userType) VALUES(?, ?, ?, ?)',
//       [username, password, schoolClass, userType]
//     );

//     if (rows.affectedRows !== 1) {
//       res.send('Your registration has failed.').sendStatus(500);
//     }

//     res.send('You have successfully registered.').sendStatus(201);
//   } catch (error) {
//     next(error);
//   }
//   db.close();
// };

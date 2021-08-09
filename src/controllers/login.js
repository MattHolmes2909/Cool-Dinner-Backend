const getDb = require('../services/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const verifyJWT = (req, res, next) => {
//   const token = req.headers['x-access-token'];

//   if (!token) {
//     res.send('No token provided.');
//   } else {
//     jwt.verify(token, 'jwtSecret', (err, decoded) => {
//       if (err) {
//         res.json({ auth: false, message: 'Failed to authenticate.' });
//       } else {
//         req.userId = decoded.id;
//         next();
//       }
//     });
//   }
// };

exports.login = async (req, res) => {
  const db = await getDb();
  const { username, password } = req.body;

  try {
    const [row] = await db.query('SELECT * FROM users WHERE username=?', [
      username,
    ]);

    if (row.length === 0) {
      res.json({ auth: false, message: 'Invalid username.' });
    }

    const checkPass = await bcrypt.compare(password, row[0].password);

    if (checkPass === false) {
      res.json({ auth: false, message: 'Wrong password.' });
    } else {
      const id = row[0].id;
      const token = jwt.sign({ id }, 'jwtSecret', {
        expiresIn: 3600,
      });
      req.session.user = res; //jwtSecret would normally be replaced with dotenv var.
      res.json({
        auth: true,
        token: token,
        result: res,
        message: 'Logged in.',
      });
    }
  } catch (err) {
    res.sendStatus(500).json(err);
    res.json({ auth: false, message: 'Server issues.' });
    console.log(err);
  }
  db.close();
};

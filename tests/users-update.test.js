const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('update child', () => {
  let db;
  let users;
  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query(
        'INSERT INTO users (username, password, schoolClass, userType) VALUES(?, ?, ?, ?)',
        ['DeanSpooner', 'password', '1DS', 'teacher']
      ),
      db.query(
        'INSERT INTO users (username, password, schoolClass, userType) VALUES(?, ?, ?, ?)',
        ['MattHolmes', 'password1', '1MH', 'teacher']
      ),
      db.query(
        'INSERT INTO users (username, password, schoolClass, userType) VALUES(?, ?, ?, ?)',
        ['admin2', 'password', null, 'admin']
      ),
    ]);

    [users] = await db.query('SELECT * FROM users');
  });

  afterEach(async () => {
    await db.query('DELETE FROM users');
    await db.close();
  });

  describe('/users/:userId', () => {
    describe('PATCH', () => {
      it('updates a single user with the correct id', async () => {
        const user = users[0];
        const res = await request(app)
          .patch(`/users/${user.id}`)
          .send({ username: 'MrSpooner', schoolClass: '1MH' });

        expect(res.status).to.equal(200);

        const [[newchildRecord]] = await db.query(
          'SELECT * FROM users WHERE id = ?',
          [user.id]
        );

        expect(newchildRecord.username).to.equal('MrSpooner');
        expect(newchildRecord.schoolClass).to.equal('1MH');
      });
    });
  });
});

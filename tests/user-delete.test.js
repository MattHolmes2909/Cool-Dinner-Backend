const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('delete user', () => {
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
    describe('DELETE', () => {
      it('deletes a single user with the correct id', async () => {
        const user = users[0];
        const res = await request(app).delete(`/users/${user.id}`).send();

        expect(res.status).to.equal(200);

        const [[deletedUserRecord]] = await db.query(
          'SELECT * FROM users WHERE id = ?',
          [user.id]
        );

        expect(!!deletedUserRecord).to.be.false;
      });

      it('returns a 404 if the user is not in the database', async () => {
        const res = await request(app).delete('/users/999999').send();

        expect(res.status).to.equal(404);
      });
    });
  });
});

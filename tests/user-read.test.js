const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('read users', () => {
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

    [users] = await db.query('SELECT * from users');
  });

  afterEach(async () => {
    await db.query('DELETE FROM users');
    await db.close();
  });

  describe('/users', () => {
    describe('GET', () => {
      it('returns all user records in the database', async () => {
        const res = await request(app).get('/users').send();

        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(3);

        res.body.forEach((userRecord) => {
          const expected = users.find((a) => a.id === userRecord.id);

          expect(userRecord).to.deep.equal(expected);
        });
      });
    });
  });

  describe('/users/:userId', () => {
    describe('GET', () => {
      it('returns a single user with the correct id', async () => {
        const expected = users[0];
        const res = await request(app).get(`/users/${expected.id}`).send();

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(expected);
      });

      it('returns a 404 if the user is not in the database', async () => {
        const res = await request(app).get('/users/999999').send();

        expect(res.status).to.equal(404);
      });
    });
  });
});

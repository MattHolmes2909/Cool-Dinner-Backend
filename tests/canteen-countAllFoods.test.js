const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('counts amount of all foods ordered', () => {
  let db;

  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query(
        'INSERT INTO child (childName, schoolClass, foodOption) VALUES(?, ?, ?)',
        ['Dean Spooner', '1DS', 'pasta']
      ),
      db.query(
        'INSERT INTO child (childName, schoolClass, foodOption) VALUES(?, ?, ?)',
        ['Matt Holmes', '1DS', 'quorn']
      ),
      db.query(
        'INSERT INTO child (childName, schoolClass, foodOption) VALUES(?, ?, ?)',
        ['Alex White', '1DS', 'quorn']
      ),
    ]);
  });

  afterEach(async () => {
    await db.query('DELETE FROM child');
    await db.close();
  });

  describe('/canteen/', () => {
    describe('GET', () => {
      it('returns the correct amount of orders for all foodOptions', async () => {
        const expected = await request(app).get(`/canteen/`).send();

        expect(expected.status).to.equal(200);
        expect(expected.body).to.deep.equal({
          pizza: {
            'COUNT(*)': 0,
          },
          pasta: {
            'COUNT(*)': 1,
          },
          fish: {
            'COUNT(*)': 0,
          },
          quorn: {
            'COUNT(*)': 2,
          },
          none: {
            'COUNT(*)': 0,
          },
        });
      });

      it('returns a 404 if the child is not in the database', async () => {
        const res = await request(app).get('/child/999999').send();

        expect(res.status).to.equal(404);
      });
    });
  });
});

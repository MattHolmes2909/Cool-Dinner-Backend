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
            total: 0,
            total1DS: 0,
            total1MH: 0,
            total2AW: 0,
            total2NM: 0,
          },
          pasta: {
            total: 1,
            total1DS: 1,
            total1MH: 0,
            total2AW: 0,
            total2NM: 0,
          },
          fish: {
            total: 0,
            total1DS: 0,
            total1MH: 0,
            total2AW: 0,
            total2NM: 0,
          },
          quorn: {
            total: 2,
            total1DS: 2,
            total1MH: 0,
            total2AW: 0,
            total2NM: 0,
          },
          none: {
            total: 0,
            total1DS: 0,
            total1MH: 0,
            total2AW: 0,
            total2NM: 0,
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

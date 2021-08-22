const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('read menu', () => {
  let db;
  let menu;

  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query(
        'INSERT INTO menu (foodName, value, foodOptionNum, allergens) VALUES(?, ?, ?, ?)',
        ['Fish and Chips', 'fish', '1', 'fish']
      ),
      db.query(
        'INSERT INTO menu (foodName, value, foodOptionNum, allergens) VALUES(?, ?, ?, ?)',
        ['Pizza', 'pizza', '2', 'none']
      ),
      db.query(
        'INSERT INTO menu (foodName, value, foodOptionNum, allergens) VALUES(?, ?, ?, ?)',
        ['Quorn Curry', 'quorn', '3', 'nuts']
      ),
    ]);

    [menu] = await db.query('SELECT * from menu');
  });

  afterEach(async () => {
    await db.query('DELETE FROM menu');
    await db.close();
  });

  describe('/menu', () => {
    describe('GET', () => {
      it('returns all menu records in the database', async () => {
        const res = await request(app).get('/menu').send();

        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(3);

        res.body.forEach((menuRecord) => {
          const expected = menu.find((a) => a.id === menuRecord.id);

          expect(menuRecord).to.deep.equal(expected);
        });
      });
    });
  });
});

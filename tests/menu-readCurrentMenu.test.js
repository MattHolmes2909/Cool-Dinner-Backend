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
        'INSERT INTO menu (foodName, value, foodOptionNum, allergens, dietary) VALUES(?, ?, ?, ?, ?)',
        ['Fish and Chips', 'fish', '1', 'fish', 'fish']
      ),
      db.query(
        'INSERT INTO menu (foodName, value, foodOptionNum, allergens, dietary) VALUES(?, ?, ?, ?, ?)',
        ['Pizza', 'pizza', '2', 'none', 'meat']
      ),
      db.query(
        'INSERT INTO menu (foodName, value, foodOptionNum, allergens, dietary) VALUES(?, ?, ?, ?, ?)',
        ['Quorn Curry', 'quorn', null, 'nuts', 'veg']
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
      it('returns current menu records in the database', async () => {
        const res = await request(app).get('/menu/current').send();

        expect(res.status).to.equal(200);
        expect(res.body.optionOne.foodName).to.equal('Fish and Chips');
        expect(res.body.optionTwo.foodName).to.equal('Pizza');
      });
    });
  });
});

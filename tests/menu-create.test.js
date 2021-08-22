const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create child with order', () => {
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

  describe('/child', () => {
    describe('POST', () => {
      it('creates a new menu option in the database', async () => {
        const res = await request(app).post('/menu').send({
          foodName: 'Cheese Pasty',
          value: 'cheesepasty',
          foodOptionNum: '4',
          allergens: 'dairy',
        });

        expect(res.status).to.equal(201);

        const [[menuEntries]] = await db.query(
          `SELECT * FROM menu WHERE foodName = 'Cheese Pasty'`
        );

        expect(menuEntries.foodName).to.equal('Cheese Pasty');
        expect(menuEntries.value).to.equal('cheesepasty');
        expect(menuEntries.foodOptionNum).to.equal(4);
        expect(menuEntries.allergens).to.equal('dairy');
      });
    });
  });
});

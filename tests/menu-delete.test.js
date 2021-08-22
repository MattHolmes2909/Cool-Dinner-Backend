const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('delete child', () => {
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

    [menu] = await db.query('SELECT * FROM menu');
  });

  afterEach(async () => {
    await db.query('DELETE FROM menu');
    await db.close();
  });

  describe('/menu/:foodId', () => {
    describe('DELETE', () => {
      it('deletes a single menu option with the correct id', async () => {
        const food = menu[0];
        const res = await request(app).delete(`/menu/${food.id}`).send();

        expect(res.status).to.equal(200);

        const [[deletedFoodRecord]] = await db.query(
          'SELECT * FROM menu WHERE id = ?',
          [food.id]
        );

        expect(!!deletedFoodRecord).to.be.false;
      });

      it('returns a 404 if the food option is not in the database', async () => {
        const res = await request(app).delete('/child/999999').send();

        expect(res.status).to.equal(404);
      });
    });
  });
});

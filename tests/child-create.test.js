const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create child with order', () => {
  let db;
  let children;

  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query(
        'INSERT INTO child (childName, schoolClass, foodOption, allergies) VALUES(?, ?, ?, ?)',
        ['Dean Spooner', '1DS', 'pasta', 'none']
      ),
      db.query(
        'INSERT INTO child (childName, schoolClass, foodOption, allergies) VALUES(?, ?, ?, ?)',
        ['Matt Holmes', '1DS', 'quorn', 'none']
      ),
      db.query(
        'INSERT INTO child (childName, schoolClass, foodOption, allergies) VALUES(?, ?, ?, ?)',
        ['Alex White', '1MH', 'fish', 'none']
      ),
    ]);

    [children] = await db.query('SELECT * from child');
  });

  afterEach(async () => {
    await db.query('DELETE FROM child');
    await db.close();
  });

  describe('/child', () => {
    describe('POST', () => {
      it('creates a new child in the database', async () => {
        const res = await request(app).post('/child').send({
          childName: 'Nathan Mayall',
          schoolClass: '1MH',
          foodOption: 'quorn',
          allergies: 'none',
        });

        expect(res.status).to.equal(201);

        const [[childEntries]] = await db.query(
          `SELECT * FROM child WHERE childName = 'Nathan Mayall'`
        );

        expect(childEntries.childName).to.equal('Nathan Mayall');
        expect(childEntries.schoolClass).to.equal('1MH');
        expect(childEntries.foodOption).to.equal('quorn');
        expect(childEntries.allergies).to.equal('none');
      });
    });
  });
});

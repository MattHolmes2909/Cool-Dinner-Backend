const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('counts amount of different food ordered', () => {
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

  describe('/canteen/:foodOption', () => {
    describe('GET', () => {
      it('returns the correct amount of orders for the selected foodOption', async () => {
        const pasta = await request(app).get(`/canteen/pasta`).send();
        const quorn = await request(app).get(`/canteen/quorn`).send();
        const nandos = await request(app).get(`/canteen/nandos`).send();

        expect(pasta.status).to.equal(200);
        expect(pasta.body).to.deep.equal({ 'COUNT(*)': 1 });
        expect(quorn.status).to.equal(200);
        expect(quorn.body).to.deep.equal({ 'COUNT(*)': 2 });
        expect(nandos.status).to.equal(200);
        expect(nandos.body).to.deep.equal({ 'COUNT(*)': 0 });
      });

      it('returns a 404 if the child is not in the database', async () => {
        const res = await request(app).get('/child/999999').send();

        expect(res.status).to.equal(404);
      });
    });
  });
});

const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create child with order', () => {
  let db;
  beforeEach(async () => (db = await getDb()));

  afterEach(async () => {
    await db.query('DELETE FROM child');
    await db.close();
  });

  describe('/child', () => {
    describe('POST', () => {
      it('creates a new child in the database', async () => {
        const res = await request(app).post('/child').send({
          childName: 'Dean Spooner',
          schoolClass: '1DS',
          foodOption: 'pasta',
        });

        expect(res.status).to.equal(201);

        const [[childEntries]] = await db.query(
          `SELECT * FROM child WHERE childName = 'Dean Spooner'`
        );

        expect(childEntries.childName).to.equal('Dean Spooner');
        expect(childEntries.schoolClass).to.equal('1DS');
      });
    });
  });
});

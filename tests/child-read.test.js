const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('read children', () => {
  let db;
  let children;

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
        ['Alex White', '1MH', 'fish']
      ),
    ]);

    [children] = await db.query('SELECT * from child');
  });

  afterEach(async () => {
    await db.query('DELETE FROM child');
    await db.close();
  });

  describe('/child', () => {
    describe('GET', () => {
      it('returns all child records in the database', async () => {
        const res = await request(app).get('/child').send();

        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(3);

        res.body.forEach((childRecord) => {
          const expected = children.find((a) => a.id === childRecord.id);

          expect(childRecord).to.deep.equal(expected);
        });
      });
    });
  });

  describe('/child/:childId', () => {
    describe('GET', () => {
      it('returns a single child with the correct id', async () => {
        const expected = children[0];
        const res = await request(app).get(`/child/${expected.id}`).send();

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(expected);
      });

      it('returns a 404 if the child is not in the database', async () => {
        const res = await request(app).get('/child/999999').send();

        expect(res.status).to.equal(404);
      });
    });
  });

  describe('/child/:schoolClass', () => {
    describe('GET', () => {
      it('returns all children from a particular class', async () => {
        const res = await request(app).get(`/child/class/1DS`).send();

        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(2);
        expect(res.body[0].childName).to.equal('Dean Spooner');
        expect(res.body[1].childName).to.equal('Matt Holmes');
      });
    });
  });
});

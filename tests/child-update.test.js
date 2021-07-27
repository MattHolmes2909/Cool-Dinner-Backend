const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('update child', () => {
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
        ['Alex White', '1DS', 'fish']
      ),
    ]);

    [children] = await db.query('SELECT * FROM child');
  });

  afterEach(async () => {
    await db.query('DELETE FROM child');
    await db.close();
  });

  describe('/child/:childId', () => {
    describe('PATCH', () => {
      it('updates a single child with the correct id', async () => {
        const child = children[0];
        const res = await request(app)
          .patch(`/child/${child.id}`)
          .send({ childName: 'Nathan Mayall', schoolClass: '1MH' });

        expect(res.status).to.equal(200);

        const [[newchildRecord]] = await db.query(
          'SELECT * FROM child WHERE id = ?',
          [child.id]
        );

        expect(newchildRecord.childName).to.equal('Nathan Mayall');
        expect(newchildRecord.schoolClass).to.equal('1MH');
      });

      it('returns a 404 if the child is not in the database', async () => {
        const res = await request(app)
          .patch('/child/999999')
          .send({ childName: 'Mike Harrison' });

        expect(res.status).to.equal(404);
      });
    });
  });
});

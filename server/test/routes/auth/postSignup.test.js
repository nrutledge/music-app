const request = require('supertest');

const app = require('../../../app');
const { clearTestDb } = require('../../../db');

beforeAll(done => {
  app.on('appStarted', () => done());
});

beforeEach(async () => {
  await clearTestDb();
});

describe('POST /signup', () => {
  const validUser = { 
    name: 'Valid User',
    email: 'valid@email.com',
    password: '123Abc!?'
  }

  it('returns 200 status for valid new user', () => {
    return request(app)
      .post('/signup')
      .send(validUser)
      .then(res => {
        expect(res.statusCode).toBe(200);
      })
  })

  it('returns 409 status for non-unique email', () => {
    return request(app)
      .post('/signup')
      .send(validUser)
      .then(() => {
        return request(app)
          .post('/signup')
          .send({ 
            name: validUser.name + '2',
            email: validUser.email,
            password: validUser.password + '2',
          })
      })
      .then(res => {
        expect(res.statusCode).toBe(409);
      })
  });

  it('returns 422 status and helpful message when name is missing', () => {
    return request(app)
      .post('/signup')
      .send({ 
        email: 'test@email.com',
        password: '123Abc!?'
      })
      .then(res => {
        expect(res.statusCode).toBe(422);
        expect(res.body.errors.length).toBeGreaterThan(0);
        expect(res.body.errors[0]).toHaveProperty('msg');
        expect(res.body.errors[0]).toHaveProperty('param');
      });
  });

  it('returns 422 status and helpful message when email is missing', () => {
    return request(app)
      .post('/signup')
      .send({ 
        name: 'Test User',
        password: '123Abc!?'
      })
      .then(res => {
        expect(res.statusCode).toBe(422);
        expect(res.body.errors.length).toBeGreaterThan(0);
        expect(res.body.errors[0]).toHaveProperty('msg');
        expect(res.body.errors[0]).toHaveProperty('param');
      });
  });

  it('returns 422 status and helpful message when password is missing', () => {
    return request(app)
      .post('/signup')
      .send({ 
        name: 'Test User',
        email: 'test@email.com'
      })
      .then(res => {
        expect(res.statusCode).toBe(422);
        expect(res.body.errors.length).toBeGreaterThan(0);
        expect(res.body.errors[0]).toHaveProperty('msg');
        expect(res.body.errors[0]).toHaveProperty('param');
      });
  });
});
import chai from 'chai';

import superTest from 'supertest';

import app from '../../app';


const server = superTest.agent(app);

const Expect = chai.expect;

describe('USER CONTROLLER TESTS', () => {
  describe('User sign up)', () => {
    it('Should return ', (done) => {
      const newUser = {
        name: 'John doe',
        email: 'example@gmail.com',
        password: '123456',
      };
      server
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res.statusCode).to.equal(201);
          Expect(res.body[0]).to.be.have.property('auth');
          Expect(res.body[0]).to.be.have.property('token');
          Expect(res.body[0].auth).to.be.equal(false);
        });
      return done();
    });
  });

  describe('POST User Login( /Auth/login)', () => {
    it('Should get status code', (done) => {

      const User = {
        email: 'nwokeochavictor@gmail.com',
        password: '123456',
      };

      server
        .post('/api/v1/auth/login')
        .send(User)
        .end((err, res) => {
          Expect(err).to.be.null;
          Expect(res.statusCode).to.equal(200);
          Expect(res.body[0]).to.be.have.property('auth');
          Expect(res.body[0]).to.be.have.property('token');
        });
      return done();
    });
  });
});

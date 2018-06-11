import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server';

const Expect = chai.expect;

chai.use(chaiHttp);

describe('USER CONTROLLER TESTS', () => {
  describe('User sign up', () => {
    it('Should return a token and a status code of 201', (done) => {
      const newUser = {
        name: 'John',
        email: 'example25@gmail.com',
        password: '123456',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          Expect(err).to.equal(null);
          Expect(res.statusCode).to.equal(201);
          Expect(res.body[0]).to.have.property('token');
          Expect(res.body[0].auth).to.be.equal(true);
        });
      return done();
    });

    it('Should return a status code of 409', (done) => {
      const newUser = {
        name: 'John doe',
        email: 'example@gmail.com',
        password: '123456',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          Expect(err).to.equal(null);
          Expect(res.statusCode).to.equal(409);
        });
      return done();
    });

    it('Should return a status code of 500', (done) => {
      const newUser = {
        name: 'John doe',
        email: 12456874,
        password: '123456',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          Expect(res.statusCode).to.equal(400);
          Expect(res.body).to.have.property('error');
        });
      return done();
    });
  });

  describe('POST User Login( /Auth/login)', () => {
    it('Should return a token', (done) => {
      const User = {
        email: 'example@gmail.com',
        password: '123456',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(User)
        .end((err, res) => {
          Expect(err).to.equal(null);
          Expect(res.statusCode).to.equal(200);
          Expect(res.body[0]).to.be.have.property('token');
        });
      done();
    });

    it('Should return a status code of 401 for incorrect password and email', (done) => {
      const User = {
        email: 'example21233@gmail.com',
        password: '12345',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(User)
        .end((err, res) => {
          Expect(res.statusCode).to.equal(401);
        });
      return done();
    });

    it('Should return a status code of 401 for invalid email', (done) => {
      const User = {
        email: 12,
        password: '1234567',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(User)
        .end((err, res) => {
          Expect(res.statusCode).to.equal(400);
        });
      return done();
    });

    it('Should return a status code of 401 for incorrect password', (done) => {
      const User = {
        email: 'example@gmail.com',
        password: '1234567',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(User)
        .end((err, res) => {
          Expect(err).to.equal(null);
          Expect(res.statusCode).to.equal(401);
        });
      return done();
    });
  });
});

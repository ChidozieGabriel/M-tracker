import chai from 'chai';

import db from '../models/userModel';


import superTest from 'supertest';

import app from '../../app';

const server = superTest.agent(app);

const Expect = chai.expect;

before((done) => {
  db.query('SELECT FROM users WHERE email="nwokeochavictor@gmail.com;"', (err, results) => {
    if (err) {
      return err;
    }
    console.log(results);
  });
  done();
});


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
          Expect(res.body[0]).to.be.have.property('token');
          Expect(res.body[0].auth)
            .to
            .be
            .equal(false);
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
          console.log(res.body);
          Expect(err).to.be.null;
          Expect(res.statusCode)
            .to
            .equal(200);
          Expect(res.body[0])
            .to
            .be
            .have
            .property('token');
        });
      return done();
    });

    it('Should get a status code', (done) => {
      const User = {
        email: 'nwokeochavictor@gmail.com',
        password: '123456',
      };


      server
        .post('/api/v1/auth/login')
        .send(User)
        .end((err, res) => {
          console.log(res.body);
          Expect(err).to.be.null;
          Expect(res.statusCode)
            .to
            .equal(200);
          Expect(res.body[0])
            .to
            .be
            .have
            .property('token');
        });
      return done();
    });
  });
});

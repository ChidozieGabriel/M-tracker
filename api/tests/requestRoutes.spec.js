import chai from 'chai';

import { Pool } from 'pg';

import db from '../models/userModel';

import superTest from 'supertest';

import chaiHttp from 'chai-http';

import app from '../../app';

const server = superTest.agent(app);

const Expect = chai.expect;

chai.use(chaiHttp);

let token = null;

beforeEach((done) => {
  server
    .post('/api/v1/auth/login')
    .send({
      email: 'nwokeochavictor@gmail.com',
      password: '123456',
    })
    .end((err, res) => {
      token = res.body.token;
      done();
    });
});
// const createDb = 'CREATE DATABASE "testRunning" WITH OWNER = "testUser" ENCODING = UTF8 CONNECTION LIMIT = -1';
// pool.query(createDb, (err, results) => {
//   if (err) {
//     return err;
//   }
//   pool.query('CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(40) NOT NULL, password VARCHAR(255) NOT NULL, admin boolean NOT NULL, name VARCHAR(255) NOT NULL)', (err, result) => {
//     if (err) {
//       return err;
//     }
//   });
//   pool.end();
// });
// return done();
// });


// afterEach((done) => {
//   pool.query('DROP DATABASE "testRunning"', (err, results) => {
//     if (err) {
//       return err;
//     }
//     pool.end();
//   });
//   return done();
// });


describe('USER REQUEST CONTROLLER API ENDPOINT', () => {
  it.only('Should list ALL requests on /user/request GET', (done) => {
    server
      .set('Authorization', 'Bearer ' + token)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        // Expect(err).to.be.null;
        Expect(res.statusCode)
          .to
          .equal(200);
        Expect(res)
          .to
          .be
          .an('object');
      });
    return done();
  });

  it('Should list ONE requests on /user/request/:requestId GET', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/110')
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(200);
        Expect(res)
          .to
          .be
          .an('object');
      });
    return done();
  });

  it('Should throw a 404 error when request is not found', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/1100')
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(404);
      });
    return done();
  });

  const data1 = {
    id: 140,
    name: 'Janet May',
    email: 'janetMaye@yahoomail.com',
    date: '2011-11-21',
    dept: 'Engineering HQ',
    request: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem',
  };

  it('should create a SINGLE request user/requests/ POST', (done) => {

    chai.request(app)
      .post('/api/v1/users/requests')
      .send(data1)
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(201);
      });
    return done();
  });

  it('should get an error when a bad request is sent on user/requests/  POST', (done) => {
    const data = {
      id: '150',
      name: 'Janet May',
      email: 'janetMaye@yahoomail.com',
      date: '2011-11-21',
      dept: 'Engineering HQ',
      request: 'Lorem ipsum',
    };

    chai.request(app)
      .post('/api/v1/users/requests/')
      .send(data)
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(400);
      });
    return done();
  });


  it('should update a SINGLE request on user/requests/:requestId PUT', (done) => {
    const data = {
      name: 'Janet May',
      email: 'janetMaye@yahoomail.com',
      date: '2011-11-21',
      dept: 'Engineering HQ',
      request: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem',
    };
    chai.request(app)
      .put('/api/v1/users/requests/110')
      .send(data)
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(200);
        Expect(res)
          .to
          .be
          .an('object');
        Expect(res.body.data)
          .to
          .be
          .an('object');
      });
    return done();
  });

  it('should get an error when a request is not found on user/requests/:requestId  PUT', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/1100')
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(404);
      });
    return done();
  });

  it('should delete requests on user/requests/:requestId  DELETE', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/110')
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(200);
      });
    return done();
  });

  it('should get an error when a request is not found on user/requests/:requestId  DELETE', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/1100')
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(404);
      });
    return done();
  });
});

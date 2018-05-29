import chai from 'chai';

// import { Pool } from 'pg';

import db from '../models/userModel';

import superTest from 'supertest';

import chaiHttp from 'chai-http';

import app from '../../app';

const server = superTest.agent(app);

const Expect = chai.expect;

chai.use(chaiHttp);

// let token = null;
global.token = null;
before((done) => {
  chai.request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'example@gmail.com',
      password: '123456',
    })
    .end((err, res) => {
      global.token = res.body.token;
      done();
    });
});


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
  it('Should list ALL requests on /user/request GET', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/')
      .set({ Authorization: 'Bearer ' + global.token })
      .end((err, res) => {
        Expect(err).to.be.null;
        Expect(res.statusCode)
          .to
          .equal(200);
        Expect(res)
          .to
          .be
          .an('object');
        done();
      });
  });


  it('Should list ONE requests on /user/request/:requestId GET', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/1')
      .set({ Authorization: 'Bearer ' + global.token })
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(200);
        Expect(res)
          .to
          .be
          .an('object');
      });
    done();
  });

  it('Should throw a 404 error when request is not found', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/1100')
      .set({ Authorization: 'Bearer ' + global.token })
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(404);
      });
    done();
  });

  const data1 = {
    name: 'Janet May',
    email: 'janetMaye@yahoomail.com',
    date: '2011-11-21',
    dept: 'Engineering HQ',
    request: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem',
  };

  it('should create a SINGLE request user/requests/ POST', (done) => {

    chai.request(app)
      .post('/api/v1/users/requests')
      .set({ Authorization: 'Bearer ' + global.token })
      .send(data1)
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(201);
      });
    done();
  });

  it('should get an error when a bad request is sent on user/requests/  POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests/')
      .set({ Authorization: 'Bearer ' + global.token })
      .send(data1)
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(400);
      });
    done();
  });


  it('should update a SINGLE request on user/requests/:requestId PUT', (done) => {
    const data = {
      name: 'Janet May',
      email: 'janetMaye@yahoomail.com',
      dept: 'Engineering HQ',
      request: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem',
    };
    chai.request(app)
      .put('/api/v1/users/requests/1')
      .set({ Authorization: 'Bearer ' + global.token })
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
    done();
  });

  it('should get an error when a request is not found on user/requests/:requestId  PUT', (done) => {
    chai.request(app)
      .put('/api/v1/users/requests/1100')
      .set({ Authorization: 'Bearer ' + global.token })
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(404);
      });
    done();
  });

  //
  it('should get an error when a request is not found on user/requests/:requestId  DELETE', (done) => {
    chai.request(app)
      .delete('/api/v1/users/requests/1110/delete')
      .set({ Authorization: 'Bearer ' + global.token })
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(404);
      });
    done();
  });

  it('should delete a request on user/requests/:requestId  DELETE', (done) => {
    chai.request(app)
      .delete('/api/v1/users/requests/1/delete')
      .set({ Authorization: 'Bearer ' + global.token })
      .end((err, res) => {
        Expect(res.statusCode)
          .to.equal(200);
      });
    done();
  });

  it('should not grant access to none admin users', (done) => {
    chai.request(app)
      .get('/api/v1/requests/')
      .set({ Authorization: 'Bearer ' + global.token })
      .end((err, res) => {
        Expect(res.statusCode)
          .to.equal(403);
      });
    done();
  });


});

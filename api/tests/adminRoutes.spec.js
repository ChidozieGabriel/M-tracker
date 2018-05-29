import chai from 'chai';

// import { Pool } from 'pg';

// import db from '../models/userModel';

import superTest from 'supertest';

import chaiHttp from 'chai-http';

import app from '../../app';

const server = superTest.agent(app);

const Expect = chai.expect;

chai.use(chaiHttp);

// let token = null;
global.tok = null;
before((done) => {
  chai.request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'admin@admin.com',
      password: '123456',
    })
    .end((err, res) => {
      global.tok = res.body.token;
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

describe('ADMIN ROUTES', () => {
  it('Should list ALL requests', (done) => {
    chai.request(app)
      .get('/api/v1/requests/')
      .set({ Authorization: 'Bearer ' + global.tok })
      .end((err, res) => {
        Expect(res.statusCode).to.equal(200);
        Expect(res).to.be.an('object');
      });
    done();
  });


  it('Should list approve a request', (done) => {
    chai.request(app)
      .put('/api/v1/requests/1/approve')
      .set({ Authorization: 'Bearer ' + global.tok })
      .end((err, res) => {
        Expect(res.statusCode).to.equal(200);
      });
    done();
  });

  it('Should list Disapprove a request', (done) => {
    chai.request(app)
      .put('/api/v1/requests/1/disapprove')
      .set({ Authorization: 'Bearer ' + global.tok })
      .end((err, res) => {
        Expect(res.statusCode).to.equal(200);
      });
    done();
  });

  it('Should list Resolve a request', (done) => {
    chai.request(app)
      .put('/api/v1/requests/1/resolve')
      .set({ Authorization: 'Bearer ' + global.tok })
      .end((err, res) => {
        Expect(res.statusCode).to.equal(200);
      });
    done();
  });
});

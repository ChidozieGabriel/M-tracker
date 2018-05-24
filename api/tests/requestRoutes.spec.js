import chai from 'chai';

import superTest from 'supertest';

import app from '../../app';


const server = superTest.agent(app);

const Expect = chai.expect;

describe('REQUEST CONTROLLER API ENDPOINT', () => {
  it('Should list ALL requests on /user/request GET', (done) => {
    server
      .get('/api/v1/users/requests')
      .end((err, res) => {
        // Expect(err).to.be.null;
        Expect(res.statusCode).to.equal(200);
        Expect(res).to.be.an('object');
        Expect(res.body.data).to.be.an('array');
      });
    return done();
  });

  it('Should list ONE requests on /user/request/:requestId GET', (done) => {
    server
      .get('/api/v1/users/requests/110')
      .end((err, res) => {
        Expect(res.statusCode).to.equal(200);
        Expect(res).to.be.an('object');
      });
    return done();
  });

  it('Should throw a 404 error when request is not found', (done) => {
    server
      .get('/api/v1/users/requests/1100')
      .end((err, res) => {
        Expect(res.statusCode).to.equal(404);
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

    server
      .post('/api/v1/users/requests')
      .send(data1)
      .end((err, res) => {
        Expect(res.statusCode).to.equal(201);
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

    server
      .post('/api/v1/users/requests/')
      .send(data)
      .end((err, res) => {
        Expect(res.statusCode).to.equal(400);
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
    server
      .put('/api/v1/users/requests/110')
      .send(data)
      .end((err, res) => {
        Expect(res.statusCode).to.equal(200);
        Expect(res).to.be.an('object');
        Expect(res.body.data).to.be.an('object');
      });
    return done();
  });

  it('should get an error when a request is not found on user/requests/:requestId  PUT', (done) => {
    server
      .put('/api/v1/users/requests/1100')
      .end((err, res) => {
        Expect(res.statusCode).to.equal(404);
      });
    return done();
  });

  it('should delete requests on user/requests/:requestId  DELETE', (done) => {
    server
      .put('/api/v1/users/requests/110')
      .end((err, res) => {
        Expect(res.statusCode).to.equal(200);
      });
    return done();
  });

  it('should get an error when a request is not found on user/requests/:requestId  DELETE', (done) => {
    server
      .put('/api/v1/users/requests/1100')
      .end((err, res) => {
        Expect(res.statusCode).to.equal(404);
      });
    return done();
  });
});

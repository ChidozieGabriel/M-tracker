'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _supertest2.default.agent(_app2.default);

var Expect = _chai2.default.expect;

describe('REQUEST CONTROLLER API ENDPOINT', function () {
  it('Should list ALL requests on /user/request GET', function (done) {
    server.get('/api/v1/users/requests').end(function (err, res) {
      // Expect(err).to.be.null;
      Expect(res.statusCode).to.equal(200);
      Expect(res).to.be.an('object');
      Expect(res.body.data).to.be.an('array');
    });
    return done();
  });

  it('Should list ONE requests on /user/request/:requestId GET', function (done) {
    server.get('/api/v1/users/requests/110').end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
      Expect(res).to.be.an('object');
    });
    return done();
  });

  it('Should throw a 404 error when request is not found', function (done) {
    server.get('/api/v1/users/requests/1100').end(function (err, res) {
      Expect(res.statusCode).to.equal(404);
    });
    return done();
  });

  var data1 = {
    id: 140,
    name: 'Janet May',
    email: 'janetMaye@yahoomail.com',
    date: '2011-11-21',
    dept: 'Engineering HQ',
    request: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem'
  };

  it('should create a SINGLE request user/requests/ POST', function (done) {

    server.post('/api/v1/users/requests').send(data1).end(function (err, res) {
      Expect(res.statusCode).to.equal(201);
    });
    return done();
  });

  it('should get an error when a bad request is sent on user/requests/  POST', function (done) {
    var data = {
      id: '150',
      name: 'Janet May',
      email: 'janetMaye@yahoomail.com',
      date: '2011-11-21',
      dept: 'Engineering HQ',
      request: 'Lorem ipsum'
    };

    server.post('/api/v1/users/requests/').send(data).end(function (err, res) {
      Expect(res.statusCode).to.equal(400);
    });
    return done();
  });

  it('should update a SINGLE request on user/requests/:requestId PUT', function (done) {
    var data = {
      name: 'Janet May',
      email: 'janetMaye@yahoomail.com',
      date: '2011-11-21',
      dept: 'Engineering HQ',
      request: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem'
    };
    server.put('/api/v1/users/requests/110').send(data).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
      Expect(res).to.be.an('object');
      Expect(res.body.data).to.be.an('object');
    });
    return done();
  });

  it('should get an error when a request is not found on user/requests/:requestId  PUT', function (done) {
    server.put('/api/v1/users/requests/1100').end(function (err, res) {
      Expect(res.statusCode).to.equal(404);
    });
    return done();
  });

  it('should delete requests on user/requests/:requestId  DELETE', function (done) {
    server.put('/api/v1/users/requests/110').end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
    });
    return done();
  });

  it('should get an error when a request is not found on user/requests/:requestId  DELETE', function (done) {
    server.put('/api/v1/users/requests/1100').end(function (err, res) {
      Expect(res.statusCode).to.equal(404);
    });
    return done();
  });
});
//# sourceMappingURL=requestRoutes.spec.js.map
'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Pool } from 'pg';

var server = _supertest2.default.agent(_server2.default);

var Expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);

// let token = null;
global.token = null;
before(function (done) {
  _chai2.default.request(_server2.default).post('/api/v1/auth/login').send({
    email: 'example@gmail.com',
    password: '123456'
  }).end(function (err, res) {
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

describe('USER REQUEST CONTROLLER API ENDPOINT', function () {
  it('Should list ALL requests on /user/request GET', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/users/requests/').set({ Authorization: 'Bearer ' + global.token }).end(function (err, res) {
      Expect(err).to.be.null;
      Expect(res.statusCode).to.equal(200);
      Expect(res).to.be.an('object');
      done();
    });
  });

  it('Should list ONE requests on /user/request/:requestId GET', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/users/requests/1').set({ Authorization: 'Bearer ' + global.token }).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
      Expect(res).to.be.an('object');
    });
    done();
  });

  it('Should throw a 404 error when request is not found', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/users/requests/1100').set({ Authorization: 'Bearer ' + global.token }).end(function (err, res) {
      Expect(res.statusCode).to.equal(404);
    });
    done();
  });

  var data1 = {
    name: 'Janet May',
    email: 'janetMaye@yahoomail.com',
    date: '2011-11-21',
    dept: 'Engineering HQ',
    request: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem'
  };

  it('should create a SINGLE request user/requests/ POST', function (done) {

    _chai2.default.request(_server2.default).post('/api/v1/users/requests').set({ Authorization: 'Bearer ' + global.token }).send(data1).end(function (err, res) {
      Expect(res.statusCode).to.equal(201);
    });
    done();
  });

  it('should get an error when a bad request is sent on user/requests/  POST', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/users/requests/').set({ Authorization: 'Bearer ' + global.token }).send(data1).end(function (err, res) {
      Expect(res.statusCode).to.equal(400);
    });
    done();
  });

  it('should update a SINGLE request on user/requests/:requestId PUT', function (done) {
    var data = {
      name: 'Janet May',
      dept: 'Engineering HQ',
      request: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem'
    };
    _chai2.default.request(_server2.default).put('/api/v1/users/requests/1').set({ Authorization: 'Bearer ' + global.token }).send(data).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
      Expect(res).to.be.an('object');
      Expect(res.body.data).to.be.an('object');
    });
    done();
  });

  it('should get an error when a request is not found on user/requests/:requestId  PUT', function (done) {
    var data = {
      name: 'Janet May',
      dept: 'Engineering HQ',
      request: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem'
    };
    _chai2.default.request(_server2.default).put('/api/v1/users/requests/1100').send(data).set({ Authorization: 'Bearer ' + global.token }).end(function (err, res) {
      Expect(res.statusCode).to.equal(404);
    });
    done();
  });

  //
  it('should get an error when a request is not found on user/requests/:requestId  DELETE', function (done) {
    _chai2.default.request(_server2.default).delete('/api/v1/users/requests/1110/delete').set({ Authorization: 'Bearer ' + global.token }).end(function (err, res) {
      Expect(res.statusCode).to.equal(404);
    });
    done();
  });

  it('should delete a request on user/requests/:requestId  DELETE', function (done) {
    _chai2.default.request(_server2.default).delete('/api/v1/users/requests/1/delete').set({ Authorization: 'Bearer ' + global.token }).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
    });
    done();
  });

  it('should not grant access to none admin users', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/requests/').set({ Authorization: 'Bearer ' + global.token }).end(function (err, res) {
      Expect(res.statusCode).to.equal(403);
    });
    done();
  });
});
//# sourceMappingURL=requestRoutes.spec.js.map
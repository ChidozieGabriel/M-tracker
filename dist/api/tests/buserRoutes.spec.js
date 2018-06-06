'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _server = require('../../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _supertest2.default.agent(_server2.default);

var Expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);

describe('USER CONTROLLER TESTS', function () {
  describe('User sign up', function () {
    it('Should return a token and a status code of 201', function (done) {
      var newUser = {
        name: 'John doe',
        email: 'example2@gmail.com',
        password: '123456'
      };
      server.post('/api/v1/auth/signup').send(newUser).end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.statusCode).to.equal(201);
        Expect(res.body[0]).to.have.property('token');
        Expect(res.body[0].auth).to.be.equal(true);
      });
      return done();
    });

    it('Should return a status code of 409', function (done) {
      var newUser = {
        name: 'John doe',
        email: 'example@gmail.com',
        password: '123456'
      };
      server.post('/api/v1/auth/signup').send(newUser).end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.statusCode).to.equal(409);
      });
      return done();
    });

    it('Should return a status code of 500', function (done) {
      var newUser = {
        name: 'John doe',
        email: 12456874,
        password: '123456'
      };
      server.post('/api/v1/auth/signup').send(newUser).end(function (err, res) {
        Expect(res.statusCode).to.equal(500);
        Expect(res.body).to.have.property('error');
      });
      return done();
    });
  });

  describe('POST User Login( /Auth/login)', function () {
    it('Should return a token', function (done) {
      var User = {
        email: 'example@gmail.com',
        password: '123456'
      };
      server.post('/api/v1/auth/login').send(User).end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.statusCode).to.equal(200);
        Expect(res.body[0]).to.be.have.property('token');
      });
      done();
    });

    it('Should return a status code of 401 for incorrect password and email', function (done) {
      var User = {
        email: 'example21233@gmail.com',
        password: '12345'
      };
      server.post('/api/v1/auth/login').send(User).end(function (err, res) {
        Expect(res.statusCode).to.equal(401);
      });
      return done();
    });

    it('Should return a status code of 401 for invalid email', function (done) {
      var User = {
        email: 12,
        password: '1234567'
      };
      server.post('/api/v1/auth/login').send(User).end(function (err, res) {
        Expect(res.statusCode).to.equal(500);
      });
      return done();
    });

    it('Should return a status code of 401 for incorrect password', function (done) {
      var User = {
        email: 'example@gmail.com',
        password: '1234567'
      };
      server.post('/api/v1/auth/login').send(User).end(function (err, res) {
        Expect(err).to.equal(null);
        Expect(res.statusCode).to.equal(401);
      });
      return done();
    });
  });
});
//# sourceMappingURL=buserRoutes.spec.js.map
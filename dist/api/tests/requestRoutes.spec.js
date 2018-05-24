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

describe('API ENDPOINT', function () {
  describe('GET request( /request )', function () {
    it('Should get an array of objects ', function (done) {
      server.get('/api/v1/users/requests').end(function (err, res) {
        // if (err) {
        //   console.log(err);
        // }else {
        //   console.log(res);
        // }
        Expect(res.statusCode).to.equal(200);
        Expect(res).to.be.an('object');
        Expect(res.body.data).to.be.an('array');
      });
      return done();
    });

    it('Should get an object', function (done) {
      server.get('/api/v1/users/requests/110').end(function (err, res) {
        Expect(res.statusCode).to.equal(200);
        Expect(res).to.be.an('object');
      });
      return done();
    });

    it('Should get Not found', function (done) {
      server.get('/api/v1/users/requests/1100').end(function (err, res) {
        Expect(res.statusCode).to.equal(404);
      });
      return done();
    });
  });

  describe('POST request( /request )', function () {
    var data = {
      id: '140',
      name: 'Janet May',
      email: 'janetMaye@yahoomail.com',
      date: '2011-11-21',
      dept: 'Engineering HQ',
      message: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem'
    };

    var data2 = {
      id: 140,
      name: 'Janet May',
      email: 'janetMaye@yahoomail.com',
      date: '2011-11-21',
      dept: 'Engineering HQ',
      message: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem'
    };

    it('Should get a status code 201', function (done) {
      server.post('/api/v1/users/requests').send(data2).end(function (err, res) {
        Expect(res.statusCode).to.equal(201);
      });
      return done();
    });

    it('Should get a status code 400', function (done) {
      server.post('/api/v1/users/requests').send(data).end(function (err, res) {
        Expect(res.statusCode).to.equal(400);
      });
      return done();
    });
  });

  describe('PUT request( /request/:requestId )', function () {
    var data3 = {
      name: 'Janet May',
      email: 'janetMaye@yahoomail.com',
      date: '2011-11-21',
      dept: 'Engineering HQ',
      message: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem'
    };

    it('Should get an array of objects ', function (done) {
      server.put('/api/v1/users/requests/110').send(data3).end(function (err, res) {
        Expect(res.statusCode).to.equal(200);
        Expect(res).to.be.an('object');
        Expect(res.body.data).to.be.an('object');
      });
      return done();
    });

    it('Should get Not found', function (done) {
      server.put('/api/v1/users/requests/1100').end(function (err, res) {
        Expect(res.statusCode).to.equal(404);
      });
      return done();
    });
  });

  describe('DELETE request( /request/:requestId )', function () {
    it('Should get an array of objects ', function (done) {
      server.put('/api/v1/users/requests/110').end(function (err, res) {
        Expect(res.statusCode).to.equal(200);
      });
      return done();
    });

    it('Should get Not found', function (done) {
      server.put('/api/v1/users/requests/1100').end(function (err, res) {
        Expect(res.statusCode).to.equal(404);
      });
      return done();
    });
  });
});
//# sourceMappingURL=requestRoutes.spec.js.map
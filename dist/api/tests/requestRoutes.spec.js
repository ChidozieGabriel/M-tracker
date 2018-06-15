'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);
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

after(function (done) {
  global.token = null;
  done();
});

describe('SERVER', function () {
  it('Should return 200 on root Endpoint  ', function (done) {
    _chai2.default.request(_server2.default).get('/').end(function (err, res) {
      Expect(err).to.be.equal(null);
      Expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('Should return 404 when an invalid route is entered', function (done) {
    _chai2.default.request(_server2.default).get('/open').end(function (err, res) {
      Expect(err).to.be.equal(null);
      Expect(res.statusCode).to.equal(404);
      done();
    });
  });
});

describe('USER REQUEST CONTROLLER API ENDPOINT', function () {

  it('Should list ALL requests on /user/request GET', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/users/requests/').set({ Authorization: 'Bearer ' + global.token }).end(function (err, res) {
      Expect(err).to.be.equal(null);
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

  it('should create a SINGLE request user/requests/ POST', function (done) {
    var data1 = {
      name: 'Janet May',
      dept: 'Engineering HQ',
      request: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem'
    };
    _chai2.default.request(_server2.default).post('/api/v1/users/requests').set({ Authorization: 'Bearer ' + global.token }).send(data1).end(function (err, res) {
      Expect(res.statusCode).to.equal(201);
    });
    done();
  });

  it('should update a SINGLE request on user/requests/:requestId PUT', function (done) {
    var data = {
      name: 'Janet May',
      dept: 'Engineering HQ',
      request: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem'
    };
    _chai2.default.request(_server2.default).put('/api/v1/users/requests/3').set({ Authorization: 'Bearer ' + global.token }).send(data).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
    });
    done();
  });

  it('should get an error when a bad request is sent on user/requests/  POST', function (done) {
    var data1 = {
      name: '',
      dept: 'Engineering HQ',
      request: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem'
    };
    _chai2.default.request(_server2.default).post('/api/v1/users/requests/').set({ Authorization: 'Bearer ' + global.token }).send(data1).end(function (err, res) {
      Expect(res.statusCode).to.equal(400);
    });
    done();
  });

  it('should get an error when a request is not found on user/requests/:requestId  PUT', function (done) {
    var data = {
      name: 'Janet May',
      dept: 'Engineering HQ',
      request: 'Lorem ipsum owjjfndfnmnxnfj Loremorem'
    };
    _chai2.default.request(_server2.default).put('/api/v1/users/requests/1100').send(data).set({ Authorization: 'Bearer ' + global.token }).end(function (err, res) {
      Expect(res.statusCode).to.equal(404);
    });
    done();
  });

  it('should get an error when a request is not found on user/requests/:requestId  DELETE', function (done) {
    _chai2.default.request(_server2.default).delete('/api/v1/users/requests/1110/delete').set({ Authorization: 'Bearer ' + global.token }).end(function (err, res) {
      Expect(res.statusCode).to.equal(404);
    });
    done();
  });

  it('should delete a request on user/requests/:requestId  DELETE', function (done) {
    _chai2.default.request(_server2.default).delete('/api/v1/users/requests/2/delete').set({ Authorization: 'Bearer ' + global.token }).end(function (err, res) {
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
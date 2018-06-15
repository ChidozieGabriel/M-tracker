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

global.tok = null;
before(function (done) {
  _chai2.default.request(_server2.default).post('/api/v1/auth/login').send({
    email: 'admin@admin.com',
    password: '123456'
  }).end(function (err, res) {
    global.tok = res.body.token;
    done();
  });
});

describe('ADMIN ROUTES', function () {

  it('Should approve a request', function (done) {
    _chai2.default.request(_server2.default).put('/api/v1/requests/1/approve').set({ Authorization: 'Bearer ' + global.tok }).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
    });
    done();
  });

  it('Should Disapprove a request', function (done) {
    _chai2.default.request(_server2.default).put('/api/v1/requests/1/disapprove').set({ Authorization: 'Bearer ' + global.tok }).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
    });
    done();
  });

  it('Should Resolve a request', function (done) {
    _chai2.default.request(_server2.default).put('/api/v1/requests/1/resolve').set({ Authorization: 'Bearer ' + global.tok }).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
    });
    done();
  });

  it('Should list ALL requests ordered by date', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/requests/').set({ Authorization: 'Bearer ' + global.tok }).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
      Expect(res).to.be.an('object');
    });
    done();
  });

  it('Should list ALL requests ordered by resolved', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/requests/resolved').set({ Authorization: 'Bearer ' + global.tok }).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
      Expect(res).to.be.an('object');
    });
    done();
  });

  it('Should list ALL requests ordered by approved', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/requests/approved').set({ Authorization: 'Bearer ' + global.tok }).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
      Expect(res).to.be.an('object');
    });
    done();
  });

  it('Should list ALL requests ordered by disapproved', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/requests/disapproved').set({ Authorization: 'Bearer ' + global.tok }).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
      Expect(res).to.be.an('object');
    });
    done();
  });

  it('Should list ALL requests ordered by pending', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/requests/pending').set({ Authorization: 'Bearer ' + global.tok }).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
      Expect(res).to.be.an('object');
    });
    done();
  });
});
//# sourceMappingURL=adminRoutes.spec.js.map
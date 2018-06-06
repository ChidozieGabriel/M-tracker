'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var server = _supertest2.default.agent(_app2.default);

// import { Pool } from 'pg';

// import db from '../models/userModel';

var Expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);

// let token = null;
global.tok = null;
before(function (done) {
  _chai2.default.request(_app2.default).post('/api/v1/auth/login').send({
    email: 'admin@admin.com',
    password: '123456'
  }).end(function (err, res) {
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

describe('ADMIN ROUTES', function () {
  it('Should list ALL requests', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/requests/').set({ Authorization: 'Bearer ' + global.tok }).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
      Expect(res).to.be.an('object');
    });
    done();
  });

  it('Should list approve a request', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/requests/1/approve').set({ Authorization: 'Bearer ' + global.tok }).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
    });
    done();
  });

  it('Should list Disapprove a request', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/requests/1/disapprove').set({ Authorization: 'Bearer ' + global.tok }).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
    });
    done();
  });

  it('Should list Resolve a request', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/requests/1/resolve').set({ Authorization: 'Bearer ' + global.tok }).end(function (err, res) {
      Expect(res.statusCode).to.equal(200);
    });
    done();
  });
});
//# sourceMappingURL=adminRoutes.spec.js.map
//# sourceMappingURL=adminRoutes.spec.js.map
//# sourceMappingURL=adminRoutes.spec.js.map
//# sourceMappingURL=adminRoutes.spec.js.map
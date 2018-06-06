'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var server = _supertest2.default.agent(_app2.default);

var Expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);

// before((done) => {
//   db.query('SELECT FROM users WHERE email="nwokeochavictor@gmail.com;"', (err, results) => {
//     if (err) {
//       return err;
//     }
//     console.log(results);
//   });
//   done();
// });


describe('USER CONTROLLER TESTS', function () {
  describe('User sign up)', function () {
    it('Should return ', function (done) {
      var newUser = {
        name: 'John doe',
        email: 'example@gmail.com',
        password: '123456'
      };
      server.post('/api/v1/auth/signup').send(newUser).end(function (err, res) {
        Expect(err).to.be.null;
        Expect(res.statusCode).to.equal(201);
        Expect(res.body[0]).to.be.have.property('token');
        Expect(res.body[0].auth).to.be.equal(false);
      });
      return done();
    });
  });

  describe('POST User Login( /Auth/login)', function () {
    it('Should return a token', function (done) {
      var User = {
        email: 'nwokeochavictor@gmail.com',
        password: '123456'
      };
      server.post('/api/v1/auth/login').send(User).end(function (err, res) {
        Expect(err).to.be.null;
        Expect(res.statusCode).to.equal(200);
        Expect(res.body[0]).to.be.have.property('token');
      });
      done();
    });
  });
});
//# sourceMappingURL=userRoutes.spec.js.map
//# sourceMappingURL=userRoutes.spec.js.map
//# sourceMappingURL=userRoutes.spec.js.map
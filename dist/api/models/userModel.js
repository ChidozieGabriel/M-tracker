'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = new _pg2.default.Pool({
  user: 'testUser',
  host: 'localhost',
  database: 'test',
  password: '123456',
  port: 5432
});

pool.query('SELECT NOW()', function (err, res) {
  console.log(err, res);
  pool.end();
});

exports.default = pool;
//# sourceMappingURL=userModel.js.map
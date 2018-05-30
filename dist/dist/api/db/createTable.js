'use strict';

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_userModel2.default.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(40) NOT NULL, name VARCHAR(40) NOT NULL, password VARCHAR(80), admin BOOLEAN NOT NULL)', function (err, res) {
  if (err) {
    return err;
  }
});

_userModel2.default.query('CREATE TABLE IF NOT EXISTS requests(id SERIAL PRIMARY KEY NOT NULL, user_id INTEGER, requester_name VARCHAR(40) NOT NULL, requester_email VARCHAR(40), date timestamp without time zone, status VARCHAR(20) NOT NULL, request VARCHAR(255) NOT NULL, dept VARCHAR(255))', function (err, res) {
  if (err) {
    return err;
  }
});
//# sourceMappingURL=createTable.js.map
//# sourceMappingURL=createTable.js.map
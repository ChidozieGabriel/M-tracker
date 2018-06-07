'use strict';

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _validations = require('../includes/validations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.signUp = function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password;

  _joi2.default.validate({
    name: name,
    email: email,
    password: password
  }, _validations.signUpValidation, function (err, value) {
    if (err === null) {
      var sql = {
        text: 'SELECT * FROM users WHERE email= $1',
        values: [value.email]
      };
      _userModel2.default.query(sql, function (err, result) {
        if (result.rows.length > 0) {
          return res.status(409).json({
            error: 'Email already exists'
          });
        }
        _bcrypt2.default.hash(password, 10, function (err, hash) {
          var query = {
            text: 'INSERT INTO users(email, name, password, admin) VALUES($1, $2, $3, $4 ) RETURNING *',
            values: [value.email, value.name, hash, false]
          };
          _userModel2.default.query(query, function (err, result) {
            if (result.rowCount === 1) {
              var token = _jsonwebtoken2.default.sign({
                id: result.rows[0].id,
                email: result.rows[0].email,
                name: result.rows[0].name
              }, process.env.JWT_KEY, {
                expiresIn: '1hr'
              });
              res.status(201).json({
                auth: true,
                token: token
              }).end();
            }
          });
        });
      });
    } else {
      res.status(400).json({
        error: err.details[0].message
      });
    }
  });
};

exports.login = function (req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;

  _joi2.default.validate({
    email: email,
    password: password
  }, _validations.loginValidation, function (err, value) {
    if (err === null) {
      var sql = {
        text: 'SELECT * FROM users WHERE email= $1',
        values: [value.email]
      };
      _userModel2.default.query(sql, function (err, result) {
        if (result && result.rows.length === 1) {
          _bcrypt2.default.compare(password, result.rows[0].password, function (error, match) {
            if (match) {
              var token = _jsonwebtoken2.default.sign({
                id: result.rows[0].id,
                email: result.rows[0].email,
                name: result.rows[0].name,
                admin: result.rows[0].admin
              }, process.env.JWT_KEY, {
                expiresIn: '1h'
              });
              res.status(200).json({
                auth: true,
                token: token
              }).end();
            } else {
              res.status(401).json({
                error: 'Login Authentication failed'
              }).end();
            }
          });
        } else {
          res.status(401).json({
            error: 'User not found'
          }).end();
        }
      });
    } else {
      res.status(400).json({
        error: err.details[0].message
      });
    }
  });
};
//# sourceMappingURL=userController.js.map
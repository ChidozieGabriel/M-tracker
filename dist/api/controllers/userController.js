'use strict';

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateEmail = function validateEmail(email) {
  var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(email);
};
exports.signUp = function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password;

  if (name.trim() === '' || typeof name !== 'string') {
    return res.status(400).json({
      error: 'Name is required and must be a string value'
    });
  } else if (email.trim() === '' || !validateEmail(email)) {
    return res.status(400).json({
      error: 'A valid email is required'
    });
  } else if (password.trim() === '' || password.length >= 8 || password.length <= 4) {
    return res.status(400).json({
      error: 'Password is required and must be less than 8 characters or greater than 4 characters'
    });
  }
  var sql = {
    text: 'SELECT * FROM users WHERE email= $1',
    values: [email]
  };
  _userModel2.default.query(sql, function (err, result) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    if (result.rows.length > 0) {
      return res.status(409).json({
        error: 'Email already exists'
      });
    }
    _bcrypt2.default.hash(password, 10, function (err, hash) {
      if (err) {
        return res.status(500).json({
          err: err
        });
      }
      var query = {
        text: 'INSERT INTO users(email, name, password, admin) VALUES($1, $2, $3, $4 ) RETURNING id',
        values: [email, name, hash, false]
      };
      _userModel2.default.query(query, function (err, result) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        }
        if (result.rowCount === 1) {
          var token = _jsonwebtoken2.default.sign({
            id: result.rows[0].id,
            email: email,
            name: name
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
};

exports.login = function (req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;

  if (email.trim() === '' || !validateEmail(email)) {
    return res.status(400).json({
      error: 'A valid email is required'
    });
  } else if (password.trim() === '' || password.length >= 8 || password.length <= 4) {
    return res.status(400).json({
      error: 'Password is required and must be less than 8 characters or greater than 4 characters'
    });
  }
  var sql = {
    text: 'SELECT * FROM users WHERE email= $1',
    values: [email]
  };
  _userModel2.default.query(sql, function (err, result) {
    if (err) {
      return res.status(500).json({
        err: err
      }).end();
    }
    if (result && result.rows.length === 1) {
      _bcrypt2.default.compare(password, result.rows[0].password, function (error, match) {
        if (error) throw error;
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
        error: 'Login Authentication Failed'
      }).end();
    }
  });
};
//# sourceMappingURL=userController.js.map
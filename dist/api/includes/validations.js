'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.requestValidation = _joi2.default.object().keys({
  name: _joi2.default.string().trim().required(),
  department: _joi2.default.string().trim().required(),
  request: _joi2.default.string().trim().min(10).max(200).required()

});
exports.signUpValidation = _joi2.default.object().keys({
  name: _joi2.default.string().alphanum().min(3).max(30).trim().required(),
  email: _joi2.default.string().email().trim().required(),
  password: _joi2.default.string().regex(/^[a-zA-Z0-9]{4,8}$/).error(function () {
    return 'invalid password ';
  })
});

exports.loginValidation = _joi2.default.object().keys({
  email: _joi2.default.string().email().trim().required(),
  password: _joi2.default.string().regex(/^[a-zA-Z0-9]{4,8}$/).length(8).error(function () {
    return 'invalid password';
  })
});
//# sourceMappingURL=validations.js.map
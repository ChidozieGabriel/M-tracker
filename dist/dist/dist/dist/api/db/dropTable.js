'use strict';

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_userModel2.default.query('DROP TABLE users', function (err, res) {
  if (err) {
    return err;
  }
});

_userModel2.default.query('DROP TABLE requests', function (err, res) {
  if (err) {
    return err;
  }
  _userModel2.default.end();
});
//# sourceMappingURL=dropTable.js.map
//# sourceMappingURL=dropTable.js.map
//# sourceMappingURL=dropTable.js.map
//# sourceMappingURL=dropTable.js.map
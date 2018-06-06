'use strict';

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var user = {
  text: 'INSERT INTO users(email, name, password, admin) VALUES($1, $2, $3, $4 ) RETURNING id',
  values: ['example@gmail.com', 'Example', '$2b$10$x0yAFrtQxs.f83ZKpb4iM.fwQlLAcc81GDhfDuFUimrNEqEDChXha', false]
};

_userModel2.default.query(user, function (err, res) {
  if (err) {
    return err;
  }
  var request = {
    text: 'INSERT INTO requests(user_id, requester_name, requester_email, date, status, request, dept) VALUES($1, $2, $3, NOW() ,$4, $5, $6)',
    values: [res.rows[0].id, 'example', 'example@gmail.com', 'pending', 'Fix fan', 'Accounts']
  };
  _userModel2.default.query(request, function (err, res) {
    if (err) {
      return err;
    }
    _userModel2.default.end();
  });
});
//# sourceMappingURL=user.seed.js.map
//# sourceMappingURL=user.seed.js.map
//# sourceMappingURL=user.seed.js.map
//# sourceMappingURL=user.seed.js.map
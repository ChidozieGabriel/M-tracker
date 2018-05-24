'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  _jsonwebtoken2.default.verify(req.body.token, process.env.JWK_KEY, function (err, decoded) {
    if (err) {
      res.status(401).json({
        message: 'Authentication failed'
      });
    }
    req.userToken = decoded;
    console.log(decoded);
  });
  next();
};
//# sourceMappingURL=userAuth.js.map
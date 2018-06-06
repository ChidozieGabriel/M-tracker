'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, next) {
  var header = req.headers.authorization;
  if (typeof header !== 'undefined') {
    var bearer = header.split(' ');
    req.token = bearer[1];
    next();
  } else {
    res.status(403).json({
      message: 'Forbidden access'
    });
  }
};
//# sourceMappingURL=verifyToken.js.map
//# sourceMappingURL=verifyToken.js.map
//# sourceMappingURL=verifyToken.js.map
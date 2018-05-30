'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, next) {
  if (req.userInfo.admin) {
    return next();
  }
  res.status(403).json({
    message: 'Forbidden access'
  });
};
//# sourceMappingURL=isAdmin.js.map
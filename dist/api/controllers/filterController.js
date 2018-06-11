'use strict';

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getAllPendingRequests = function (req, res) {
  var sql = {
    text: 'SELECT * FROM requests ORDER BY status=\'pending\' desc'
  };
  _userModel2.default.query(sql, function (err, result) {
    if (err) {
      return res.status(500).json({
        err: err
      }).end();
    }
    res.status(200).json({
      user: req.userInfo,
      result: result.rows
    });
  });
};

exports.getAllApprovedRequests = function (req, res) {
  var sql = {
    text: 'SELECT * FROM requests ORDER BY status=\'approved\' desc'
  };
  _userModel2.default.query(sql, function (err, result) {
    if (err) {
      return res.status(500).json({
        err: err
      }).end();
    }
    res.status(200).json({
      user: req.userInfo,
      result: result.rows
    });
  });
};

exports.getAllDisapprovedRequests = function (req, res) {
  var sql = {
    text: 'SELECT * FROM requests ORDER BY status=\'disapproved\' desc'
  };
  _userModel2.default.query(sql, function (err, result) {
    if (err) {
      return res.status(500).json({
        err: err
      }).end();
    }
    res.status(200).json({
      user: req.userInfo,
      result: result.rows
    });
  });
};

exports.getAllResolvedRequests = function (req, res) {
  var sql = {
    text: 'SELECT * FROM requests ORDER BY status=\'resolved\' desc'
  };
  _userModel2.default.query(sql, function (err, result) {
    if (err) {
      return res.status(500).json({
        err: err
      }).end();
    }
    res.status(200).json({
      user: req.userInfo,
      result: result.rows
    });
  });
};
//# sourceMappingURL=filterController.js.map
'use strict';

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getAllRequests = function (req, res) {
  var sql = {
    text: 'SELECT * FROM requests ORDER BY id ASC'
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

exports.approveRequest = function (req, res) {
  var id = parseInt(req.params.requestId, 10);
  var query = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2 RETURNING *',
    values: ['approved', id]
  };
  _userModel2.default.query(query, function (err, result) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    if (result.rows.length > 0) {
      return res.status(200).json({
        result: result.rows
      });
    }
  });
};

exports.disapproveRequest = function (req, res) {
  var id = parseInt(req.params.requestId, 10);
  var query = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2 RETURNING *',
    values: ['disapproved', id]
  };
  _userModel2.default.query(query, function (err, result) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    if (result.rows.length > 0) {
      return res.status(200).json({
        result: result.rows
      });
    }
  });
};

exports.resolveRequest = function (req, res) {
  var id = parseInt(req.params.requestId, 10);
  var query = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2 RETURNING *',
    values: ['resolved', id]
  };
  _userModel2.default.query(query, function (err, result) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    if (result.rows.length > 0) {
      return res.status(200).json({
        result: result.rows
      });
    }
  });
};
//# sourceMappingURL=adminController.js.map
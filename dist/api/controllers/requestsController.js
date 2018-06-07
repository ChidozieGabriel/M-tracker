'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _validations = require('../includes/validations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getAllUserRequests = function (req, res) {
  var userId = req.userInfo.id;
  var sql = {
    text: 'SELECT * FROM requests WHERE user_id=$1 ORDER BY id ASC',
    values: [userId]
  };
  _userModel2.default.query(sql, function (err, result) {
    res.status(200).json({
      user: req.userInfo,
      result: result.rows
    });
  });
};

exports.getSingleRequest = function (req, res) {
  var userId = req.userInfo.id;
  var id = parseInt(req.params.requestId, 10);
  var sql = {
    text: 'SELECT * FROM requests WHERE id=$1 AND user_id=$2 ORDER BY id ASC',
    values: [id, userId]
  };
  _userModel2.default.query(sql, function (err, result) {
    if (err) {
      return res.status(500).json({
        error: err
      }).end();
    }
    if (result.rows.length > 0) {
      return res.status(200).json({
        result: result.rows
      });
    }
    res.status(404).json({
      message: 'Request not found'
    });
  });
};

exports.createRequest = function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      dept = _req$body.dept,
      request = _req$body.request;

  _joi2.default.validate({
    name: name,
    department: dept,
    request: request
  }, _validations.requestValidation, function (err, value) {
    if (err === null) {
      var userId = req.userInfo.id;
      var query = {
        text: 'INSERT INTO requests(user_id, requester_name, requester_email, date, status, request, dept) VALUES($1, $2, $3, NOW() ,$4, $5, $6)',
        values: [userId, value.name, req.userInfo.email, 'pending', value.request, value.department]
      };
      _userModel2.default.query(query, function (err, result) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        }
        res.status(201).json({
          message: 'Request Created successfully'
        });
      });
    } else {
      res.status(400).json({
        error: err.details[0].message
      });
    }
  });
};

exports.modifyRequest = function (req, res) {
  var id = parseInt(req.params.requestId, 10);
  _userModel2.default.query('SELECT status FROM requests WHERE id=$1', [id], function (err, response) {
    if (err) {
      return res.status(500).json({ err: err });
    }
    if (response.rows.length !== 0 && (response.rows[0].status === 'approved' || response.rows[0].status === 'resolved')) {
      return res.status(409).json({
        error: 'Cannot edit!, Request has already been approved'
      });
    }
    var _req$body2 = req.body,
        name = _req$body2.name,
        dept = _req$body2.dept,
        request = _req$body2.request;

    _joi2.default.validate({
      name: name,
      department: dept,
      request: request
    }, _validations.requestValidation, function (err, value) {
      if (err === null) {
        var query = {
          text: 'UPDATE requests SET requester_name=$1, date=NOW(), request=$2, dept=$3 WHERE id=$4 RETURNING *',
          values: [value.name, value.request, value.department, id]
        };
        _userModel2.default.query(query, function (err, result) {
          if (err) {
            return res.status(500).json({ err: err });
          }
          if (result.rowCount === 1 && result.rows.length > 0) {
            return res.status(200).json({ result: result.rows });
          }
          res.status(404).json({
            message: 'Request Not found'
          });
        });
      } else {
        res.status(400).json({
          error: err.details[0].message
        });
      }
    });
  });
};

exports.deleteRequest = function (req, res) {
  var id = parseInt(req.params.requestId, 10);
  _userModel2.default.query('SELECT status FROM requests WHERE id=$1', [id], function (err, response) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    if (response.rows.length !== 0 && (response.rows[0].status === 'approved' || response.rows[0].status === 'resolved')) {
      return res.status(409).json({
        error: 'Cannot Delete!, Request has already been approved'
      });
    }
    _userModel2.default.query('DELETE FROM requests WHERE id=$1', [id], function (err, result) {
      if (err) {
        return res.status(500).json({
          err: err
        });
      }
      if (result.rowCount === 0) {
        return res.status(404).json({
          message: 'Request Not found'
        });
      }
      res.status(200).json({
        message: 'Request deleted successfully'
      });
    });
  });
};
//# sourceMappingURL=requestsController.js.map
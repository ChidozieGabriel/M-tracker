'use strict';

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getAllUserRequests = function (req, res) {
  var userId = req.userInfo.id;
  var sql = {
    text: 'SELECT * FROM requests WHERE user_id=$1 ORDER BY id ASC',
    values: [userId]
  };
  _userModel2.default.query(sql, function (err, result) {
    res.status(200).set('Access-Control-Allow-Origin', '*').json({
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
    // if (err) {
    //   return res.status(500)
    //     .json({
    //       error: err,
    //     })
    //     .end();
    // }
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
  var userId = req.userInfo.id;
  var query = {
    text: 'INSERT INTO requests(user_id, requester_name, requester_email, date, status, request, dept) VALUES($1, $2, $3, NOW() ,$4, $5, $6)',
    values: [userId, req.body.name, req.body.email, 'pending', req.body.request, req.body.dept]
  };
  _userModel2.default.query(query, function (err, result) {
    // if (err) {
    //   return res.status(500)
    //     .json({
    //       err,
    //     });
    // }
    res.status(201).json({
      message: 'Request Created successfully'
    });
    if (req.body.name && req.body.email === null) {
      res.status(400).json({
        message: 'Bad Request'
      });
    }
  });
};

exports.modifyRequest = function (req, res) {
  var userId = req.userInfo.id;
  var id = parseInt(req.params.requestId, 10);
  var query = {
    text: 'UPDATE requests SET requester_name=$1, requester_email=$2, date=NOW(), request=$3, dept=$4 WHERE id=$5',
    values: [req.body.name, req.body.email, req.body.request, req.body.dept, id]
  };

  _userModel2.default.query(query, function (err, result) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    if (result.rowCount === 1) {
      var sql = {
        text: 'SELECT * FROM requests WHERE id=$1 AND user_id=$2',
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
      });
    }
  });
};

exports.deleteRequest = function (req, res) {
  var id = parseInt(req.params.requestId, 10);
  var query = {
    text: 'DELETE FROM requests WHERE id=$1',
    values: [id]
  };
  _userModel2.default.query(query, function (err, result) {
    // if (err) {
    //   return res.status(500)
    //     .json({
    //       err,
    //     });
    // }
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'Request Not found'
      });
    }
    res.status(200).json({
      message: 'Request deleted successfully'
    });
  });
};

// Admin Controllers
exports.getAllRequests = function (req, res) {
  // const userId = req.userInfo.id;
  var sql = {
    text: 'SELECT * FROM requests'
  };
  _userModel2.default.query(sql, function (err, result) {
    // if (err) {
    //   return res.status(500)
    //     .json({
    //       err,
    //     })
    //     .end();
    // }
    // res.set('Access-Control-Allow-Origin', '*');
    res.status(200).set('Access-Control-Allow-Origin', '*').json({
      user: req.userInfo,
      result: result.rows
    });
  });
};

exports.approveRequest = function (req, res) {
  var userId = req.userInfo.id;
  var id = parseInt(req.params.requestId, 10);
  var query = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2',
    values: ['approved', id]
  };

  _userModel2.default.query(query, function (err, result) {
    // if (err) {
    //   return res.status(500)
    //     .json({
    //       err,
    //     });
    // }
    if (result.rowCount === 1) {
      var sql = {
        text: 'SELECT * FROM requests WHERE id=$1 ORDER BY id ASC',
        values: [id]
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
      });
    }
  });
};

exports.disapproveRequest = function (req, res) {
  var userId = req.userInfo.id;
  var id = parseInt(req.params.requestId, 10);
  var query = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2',
    values: ['disapproved', id]
  };

  _userModel2.default.query(query, function (err, result) {
    // if (err) {
    //   return res.status(500)
    //     .json({
    //       err,
    //     });
    // }
    if (result.rowCount === 1) {
      var sql = {
        text: 'SELECT * FROM requests WHERE id=$1 ORDER BY id ASC',
        values: [id]
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
      });
    }
  });
};

exports.resolveRequest = function (req, res) {
  var userId = req.userInfo.id;
  var id = parseInt(req.params.requestId, 10);
  var query = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2',
    values: ['resolved', id]
  };

  _userModel2.default.query(query, function (err, result) {
    // if (err) {
    //   return res.status(500)
    //     .json({
    //       err,
    //     });
    // }
    if (result.rowCount === 1) {
      var sql = {
        text: 'SELECT * FROM requests WHERE id=$1 ORDER BY id ASC',
        values: [id]
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
      });
    }
  });
};
//# sourceMappingURL=requestsController.js.map
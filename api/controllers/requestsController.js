import db from '../models/userModel';

const validateEmail = (email) => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(email);
};


exports.getAllUserRequests = (req, res) => {
  const userId = req.userInfo.id;
  const sql = {
    text: 'SELECT * FROM requests WHERE user_id=$1 ORDER BY id ASC',
    values: [userId],
  };
  db.query(sql, (err, result) => {
    res.status(200)
      .json({
        user: req.userInfo,
        result: result.rows,
      });
  });
};

exports.getSingleRequest = (req, res) => {
  const userId = req.userInfo.id;
  const id = parseInt(req.params.requestId, 10);
  const sql = {
    text: 'SELECT * FROM requests WHERE id=$1 AND user_id=$2 ORDER BY id ASC',
    values: [id, userId],
  };
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500)
        .json({
          error: err,
        })
        .end();
    }
    if (result.rows.length > 0) {
      return res.status(200)
        .json({
          result: result.rows,
        });
    }
    res.status(404)
      .json({
        message: 'Request not found',
      });
  });
};

exports.createRequest = (req, res) => {
  if ((req.body.name).trim() === '' || typeof req.body.name !== 'string') {
    return res.status(400)
      .json({
        error: 'Name is required and must be a string value',
      });
  } else if ((req.body.dept).trim() === '' || typeof req.body.dept !== 'string') {
    return res.status(400)
      .json({
        error: 'Department is required and must be a string value',
      });
  } else if ((req.body.request).trim() === '' || req.body.request.length >= 200 || req.body.request.length <= 10) {
    return res.status(400)
      .json({
        error: 'Request cannot be empty or more than 200 characters',
      });
  }
  const userId = req.userInfo.id;
  const query = {
    text: 'INSERT INTO requests(user_id, requester_name, requester_email, date, status, request, dept) VALUES($1, $2, $3, NOW() ,$4, $5, $6)',
    values: [userId, req.body.name, req.userInfo.email, 'pending', req.body.request, req.body.dept],
  };
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500)
        .json({
          err,
        });
    }
    res.status(201)
      .json({
        message: 'Request Created successfully',
      });
    if (req.body.name && req.body.email === null) {
      res.status(400)
        .json({
          message: 'Bad Request',
        });
    }
  });
};

exports.modifyRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  if ((req.body.name).trim() === '' || typeof req.body.name !== 'string') {
    return res.status(400)
      .json({
        error: 'Name is required and must be a string value',
      });
  } else if ((req.body.dept).trim() === '' || typeof req.body.dept !== 'string') {
    return res.status(400)
      .json({
        error: 'Department is required and must be a string value',
      });
  } else if (req.body.request === '' || req.body.request.length >= 200 || req.body.request.length <= 10) {
    return res.status(400)
      .json({
        error: 'Request cannot be empty or more than 200 characters',
      });
  }
  db.query('SELECT status FROM requests WHERE id=$1', [id], (err, response) => {
    if (err) {
      return res.status(500)
        .json({
          err,
        });
    }
    if (response.rows.length !== 0 && (response.rows[0].status === 'approved' || response.rows[0].status === 'resolved')) {
      return res.status(409)
        .json({
          error: 'Cannot edit!, Request has already been approved',
        });
    }
    const query = {
      text: 'UPDATE requests SET requester_name=$1, date=NOW(), request=$2, dept=$3 WHERE id=$4 RETURNING *',
      values: [req.body.name, req.body.request, req.body.dept, id],
    };
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500)
          .json({
            err,
          });
      }
      if (result.rowCount === 1 && result.rows.length > 0) {
        return res.status(200)
          .json({
            result: result.rows,
          });
      }
      res.status(404)
        .json({
          message: 'Request Not found',
        });
    });
  });
};

exports.deleteRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  db.query('SELECT status FROM requests WHERE id=$1', [id], (err, response) => {
    if (err) {
      return res.status(500)
        .json({
          err,
        });
    }
    if (response.rows.length !== 0 && (response.rows[0].status === 'approved' || response.rows[0].status === 'resolved')) {
      return res.status(409)
        .json({
          error: 'Cannot Delete!, Request has already been approved',
        });
    }
    db.query('DELETE FROM requests WHERE id=$1', [id], (err, result) => {
      if (err) {
        return res.status(500)
          .json({
            err,
          });
      }
      if (result.rowCount === 0) {
        return res.status(404)
          .json({
            message: 'Request Not found',
          });
      }
      res.status(200)
        .json({
          message: 'Request deleted successfully',
        });
    });
  });
};


// Admin Controllers
exports.getAllRequests = (req, res) => {
  const sql = {
    text: 'SELECT * FROM requests ORDER BY id ASC',
  };
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500)
        .json({
          err,
        })
        .end();
    }
    res.status(200)
      .json({
        user: req.userInfo,
        result: result.rows,
      });
  });
};

exports.approveRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  const query = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2',
    values: ['approved', id],
  };
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500)
        .json({
          err,
        });
    }
    if (result.rowCount === 1) {
      const sql = {
        text: 'SELECT * FROM requests WHERE id=$1 ORDER BY id ASC',
        values: [id],
      };
      db.query(sql, (err, result) => {
        if (err) {
          return res.status(500)
            .json({
              error: err,
            })
            .end();
        }
        if (result.rows.length > 0) {
          return res.status(200)
            .json({
              result: result.rows,
            });
        }
      });
    }
  });
};

exports.disapproveRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  const query = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2',
    values: ['disapproved', id],
  };
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500)
        .json({
          err,
        });
    }
    if (result.rowCount === 1) {
      const sql = {
        text: 'SELECT * FROM requests WHERE id=$1 ORDER BY id ASC',
        values: [id],
      };
      db.query(sql, (err, result) => {
        if (err) {
          return res.status(500)
            .json({
              error: err,
            })
            .end();
        }
        if (result.rows.length > 0) {
          return res.status(200)
            .json({
              result: result.rows,
            });
        }
      });
    }
  });
};

exports.resolveRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  const query = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2',
    values: ['resolved', id],
  };
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500)
        .json({
          err,
        });
    }
    if (result.rowCount === 1) {
      const sql = {
        text: 'SELECT * FROM requests WHERE id=$1 ORDER BY id ASC',
        values: [id],
      };
      db.query(sql, (err, result) => {
        if (err) {
          return res.status(500)
            .json({
              error: err,
            })
            .end();
        }
        if (result.rows.length > 0) {
          return res.status(200)
            .json({
              result: result.rows,
            });
        }
      });
    }
  });
};

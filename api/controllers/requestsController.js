import db from '../models/userModel';

exports.getAllUserRequests = (req, res) => {
  const userId = req.userInfo.id;
  const sql = {
    text: 'SELECT * FROM requests WHERE user_id=$1 ORDER BY id ASC',
    values: [userId],
  };
  db.query(sql, (err, result) => {
    res.status(200)
      .set('Access-Control-Allow-Origin', '*')
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
    // if (err) {
    //   return res.status(500)
    //     .json({
    //       error: err,
    //     })
    //     .end();
    // }
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
  const userId = req.userInfo.id;
  const query = {
    text: 'INSERT INTO requests(user_id, requester_name, requester_email, date, status, request, dept) VALUES($1, $2, $3, NOW() ,$4, $5, $6)',
    values: [userId, req.body.name, req.body.email, 'pending', req.body.request, req.body.dept],
  };
  db.query(query, (err, result) => {
    // if (err) {
    //   return res.status(500)
    //     .json({
    //       err,
    //     });
    // }
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
  const userId = req.userInfo.id;
  const id = parseInt(req.params.requestId, 10);
  const query = {
    text: 'UPDATE requests SET requester_name=$1, requester_email=$2, date=NOW(), request=$3, dept=$4 WHERE id=$5',
    values: [req.body.name, req.body.email, req.body.request, req.body.dept, id],
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
        text: 'SELECT * FROM requests WHERE id=$1 AND user_id=$2',
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
      });
    }
  });
};

exports.deleteRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  const query = {
    text: 'DELETE FROM requests WHERE id=$1',
    values: [id],
  };
  db.query(query, (err, result) => {
    // if (err) {
    //   return res.status(500)
    //     .json({
    //       err,
    //     });
    // }
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
};


// Admin Controllers
exports.getAllRequests = (req, res) => {
  // const userId = req.userInfo.id;
  const sql = {
    text: 'SELECT * FROM requests',
  };
  db.query(sql, (err, result) => {
    // if (err) {
    //   return res.status(500)
    //     .json({
    //       err,
    //     })
    //     .end();
    // }
    // res.set('Access-Control-Allow-Origin', '*');
    res.status(200)
      .set('Access-Control-Allow-Origin', '*')
      .json({
        user: req.userInfo,
        result: result.rows,
      });
  });
};

exports.approveRequest = (req, res) => {
  const userId = req.userInfo.id;
  const id = parseInt(req.params.requestId, 10);
  const query = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2',
    values: ['approved', id],
  };

  db.query(query, (err, result) => {
    // if (err) {
    //   return res.status(500)
    //     .json({
    //       err,
    //     });
    // }
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
  const userId = req.userInfo.id;
  const id = parseInt(req.params.requestId, 10);
  const query = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2',
    values: ['disapproved', id],
  };

  db.query(query, (err, result) => {
    // if (err) {
    //   return res.status(500)
    //     .json({
    //       err,
    //     });
    // }
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
  const userId = req.userInfo.id;
  const id = parseInt(req.params.requestId, 10);
  const query = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2',
    values: ['resolved', id],
  };

  db.query(query, (err, result) => {
    // if (err) {
    //   return res.status(500)
    //     .json({
    //       err,
    //     });
    // }
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

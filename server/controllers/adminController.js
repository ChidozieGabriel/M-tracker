import db from '../config/config';

exports.getAllRequests = (req, res) => {
  const sql = {
    text: 'SELECT * FROM requests ORDER BY date DESC',
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
  const id = parseInt(req.params.requestId, 10);
  const sql = {
    text: 'SELECT * FROM requests WHERE id=$1 ORDER BY id ASC',
    values: [id],
  };
  db.query(sql, (err, result) => {
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

exports.approveRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  const query = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2 RETURNING *',
    values: ['approved', id],
  };
  db.query(query, (err, result) => {
    if (result.rows.length > 0) {
      return res.status(200)
        .json({
          result: result.rows,
        });
    }
  });
};

exports.disapproveRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  const query = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2 RETURNING *',
    values: ['disapproved', id],
  };
  db.query(query, (err, result) => {
    if (result.rows.length > 0) {
      return res.status(200)
        .json({
          result: result.rows,
        });
    }
  });
};

exports.resolveRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  const query = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2 RETURNING *',
    values: ['resolved', id],
  };
  db.query(query, (err, result) => {
    if (result.rows.length > 0) {
      return res.status(200)
        .json({
          result: result.rows,
        });
    }
  });
};

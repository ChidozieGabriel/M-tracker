import db from '../config/config';

export const getAllRequests = (req, res) => {
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

export const getOneRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  const sql = {
    text: 'SELECT * FROM requests WHERE id=$1 ORDER BY date ASC',
    values: [id],
  };
  db.query(sql, (err, result) => {
    res.status(200)
      .json({
        user: req.userInfo,
        result: result.rows,
      });
  });
};

export const approveRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  const approvedQuery = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2 RETURNING *',
    values: [1, id],
  };
  db.query(approvedQuery, (err, result) => {
    res.status(200)
      .json({
        result: result.rows,
      });
  });
};

export const disapproveRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  const disapproveQuery = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2 RETURNING *',
    values: [2, id],
  };
  db.query(disapproveQuery, (err, result) => {
    res.status(200)
      .json({
        result: result.rows,
      });
  });
};

export const resolveRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  const resolvedQuery = {
    text: 'UPDATE requests SET status=$1 WHERE id=$2 RETURNING *',
    values: [3, id],
  };
  db.query(resolvedQuery, (err, result) => {
    res.status(200)
      .json({
        result: result.rows,
      });
  });
};

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

export const adminRequestActions = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  const { action } = req.params;
  let sql = '';
  switch (action) {
    case 'approve':
      sql = `UPDATE requests SET status=${1} WHERE id=${id} RETURNING *`;
      break;
    case 'disapprove':
      sql = `UPDATE requests SET status=${2} WHERE id=${id} RETURNING *`;
      break;
    case 'resolve':
      sql = `UPDATE requests SET status=${3} WHERE id=${id} RETURNING *`;
      break;
    default:
      sql = `UPDATE requests SET status=${0} WHERE id=${id} RETURNING *`;
      break;
  }
  db.query(sql, (err, result) => {
    res.status(200)
      .json({
        user: req.userInfo,
        result: result.rows,
      });
  });
};

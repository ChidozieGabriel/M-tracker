import db from '../config/config';

exports.getAllPendingRequests = (req, res) => {
  const sql = {
    text: 'SELECT * FROM requests ORDER BY status=\'pending\' desc',
  };
  db.query(sql, (err, result) => {
    res.status(200)
      .json({
        user: req.userInfo,
        result: result.rows,
      });
  });
};

exports.getAllApprovedRequests = (req, res) => {
  const sql = {
    text: 'SELECT * FROM requests ORDER BY status=\'approved\' desc',
  };
  db.query(sql, (err, result) => {
    res.status(200)
      .json({
        user: req.userInfo,
        result: result.rows,
      });
  });
};

exports.getAllDisapprovedRequests = (req, res) => {
  const sql = {
    text: 'SELECT * FROM requests ORDER BY status=\'disapproved\' desc',
  };
  db.query(sql, (err, result) => {
    res.status(200)
      .json({
        user: req.userInfo,
        result: result.rows,
      });
  });
};

exports.getAllResolvedRequests = (req, res) => {
  const sql = {
    text: 'SELECT * FROM requests ORDER BY status=\'resolved\' desc',
  };
  db.query(sql, (err, result) => {
    res.status(200)
      .json({
        user: req.userInfo,
        result: result.rows,
      });
  });
};

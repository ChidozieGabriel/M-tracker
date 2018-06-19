import db from '../config/config';

export const requestsOrderBy = (req, res) => {
  const { action } = req.params;
  let sql = '';
  switch (action) {
    case 'approved':
      sql = "SELECT * FROM requests ORDER BY status='1' desc";
      break;
    case 'disapproved':
      sql = "SELECT * FROM requests ORDER BY status='2' desc";
      break;
    case 'resolved':
      sql = "SELECT * FROM requests ORDER BY status='3' desc";
      break;
    default:
      sql = "SELECT * FROM requests ORDER BY status='0' desc";
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

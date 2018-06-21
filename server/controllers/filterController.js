import { dbResults } from '../helpers/utilities';

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
  dbResults(sql, req.userInfo, res);

};

export const usersRequestsOrderBy = (req, res) => {
  const userId = req.userInfo.id;
  const { action } = req.params;
  let sql = '';
  switch (action) {
    case 'approved':
      sql = `SELECT * FROM requests WHERE user_id=${userId} ORDER BY status='1' DESC`;
      break;
    case 'disapproved':
      sql = `SELECT * FROM requests WHERE user_id=${userId} ORDER BY status='2' DESC`;
      break;
    case 'resolved':
      sql = `SELECT * FROM requests WHERE user_id=${userId} ORDER BY status='3' DESC`;
      break;
    default:
      sql = `SELECT * FROM requests WHERE user_id=${userId} ORDER BY status='0' DESC`;
      break;
  }
  dbResults(sql, req.userInfo, res);
};

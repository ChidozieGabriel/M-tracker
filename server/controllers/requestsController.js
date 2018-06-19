import Validator from 'validatorjs';

import db from '../config/config';

import { requestValidation, restriction } from '../helpers/validations';

export const getAllUserRequests = (req, res) => {
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

export const getSingleRequest = (req, res) => {
  const userId = req.userInfo.id;
  const id = parseInt(req.params.requestId, 10);
  const singleSelectQuery = {
    text: 'SELECT * FROM requests WHERE id=$1 AND user_id=$2 ORDER BY id ASC',
    values: [id, userId],
  };
  db.query(singleSelectQuery, (err, result) => {
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

export const createRequest = (req, res) => {
  const { dept, request } = req.body;
  const validation = new Validator({
    dept,
    request
  }, requestValidation);
  validation.setAttributeNames({ dept: 'Department field' });
  validation.passes(() => {
    const userId = req.userInfo.id;
    const getUserQuery = {
      text: `SELECT email, name, admin FROM users WHERE id=${userId}`,
    };
    db.query(getUserQuery, (err, result) => {
      const createRequestQuery = {
        text: 'INSERT INTO ' +
        'requests(user_id, requester_name, ' +
        'requester_email, date, status, request, dept)' +
        ' VALUES($1, $2, $3, NOW() ,$4, $5, $6)',
        values: [userId, result.rows[0].name, result.rows[0].email,
          0, request, dept],
      };
      db.query(createRequestQuery, (err, result) => {
        res.status(201)
          .json({
            status: true,
            message: 'Request Created successfully',
          });
      });
    });
  });
  validation.fails(() => {
    res.status(400)
      .send(validation.errors);
  });
};

export const modifyRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  db.query('SELECT status FROM requests WHERE id=$1', [id], (err, response) => {
    if (restriction(response)) {
      return res.status(409)
        .json({
          error: 'Request already approved',
        });
    }
    const { dept, request } = req.body;
    const validation = new Validator({ dept, request }, requestValidation);
    validation.setAttributeNames({ dept: 'Department' });
    validation.passes(() => {
      const updateQuery = {
        text: 'UPDATE requests SET ' +
        'date=NOW(), request=$1, dept=$2 WHERE id=$3 RETURNING *',
        values: [request, dept, id],
      };
      db.query(updateQuery, (err, result) => {
        if (result.rowCount === 1 && result.rows.length > 0) {
          return res.status(200)
            .json({ result: result.rows });
        }
        res.status(404)
          .json({
            message: 'Request Not found',
          });
      });
    });
    validation.fails(() => {
      res.status(400)
        .send(validation.errors);
    });
  });
};

export const deleteRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  db.query('SELECT status FROM requests WHERE id=$1', [id], (err, response) => {
    if (restriction(response)) {
      return res.status(409)
        .json({
          error: 'Request already approved',
        });
    }
    db.query('DELETE FROM requests WHERE id=$1', [id], (err, result) => {
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

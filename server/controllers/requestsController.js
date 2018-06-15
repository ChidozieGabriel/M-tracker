import Joi from 'joi';

import db from '../config/config';

import { requestValidation } from '../helpers/validations';

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
  const { name, dept, request } = req.body;
  Joi.validate({
    name,
    department: dept,
    request,
  }, requestValidation, (err, value) => {
    if (err === null) {
      const userId = req.userInfo.id;
      const query = {
        text: 'INSERT INTO requests(user_id, requester_name, requester_email, date, status, request, dept) VALUES($1, $2, $3, NOW() ,$4, $5, $6)',
        values: [userId, value.name, req.userInfo.email, 'pending', value.request, value.department],
      };
      db.query(query, (err, result) => {
        res.status(201)
          .json({
            message: 'Request Created successfully',
          });
      });
    } else {
      res.status(400)
        .json({
          error: err.details[0].message,
        });
    }
  });
};

exports.modifyRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  db.query('SELECT status FROM requests WHERE id=$1', [id], (err, response) => {
    if (response.rows.length !== 0 && (response.rows[0].status === 'approved' || response.rows[0].status === 'resolved')) {
      return res.status(409)
        .json({
          error: 'Cannot edit!, Request has already been approved',
        });
    }
    const { name, dept, request } = req.body;
    Joi.validate({
      name,
      department: dept,
      request,
    }, requestValidation, (err, value) => {
      if (err === null) {
        const query = {
          text: 'UPDATE requests SET requester_name=$1, date=NOW(), request=$2, dept=$3 WHERE id=$4 RETURNING *',
          values: [value.name, value.request, value.department, id],
        };
        db.query(query, (err, result) => {
          if (result.rowCount === 1 && result.rows.length > 0) {
            return res.status(200)
              .json({ result: result.rows });
          }
          res.status(404)
            .json({
              message: 'Request Not found',
            });
        });
      } else {
        res.status(400)
          .json({
            error: err.details[0].message,
          });
      }
    });
  });
};

exports.deleteRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  db.query('SELECT status FROM requests WHERE id=$1', [id], (err, response) => {
    if (response.rows.length !== 0 && (response.rows[0].status === 'approved' || response.rows[0].status === 'resolved')) {
      return res.status(409)
        .json({
          error: 'Cannot Delete!, Request has already been approved',
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

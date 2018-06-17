import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import Validator from 'validatorjs';

import user from '../config/config';

import { signUpValidation, loginValidation } from '../helpers/validations';

export const signUp = (req, res) => {
  const { name, email, password } = req.body;
  const validation = new Validator({ name, password, email }, signUpValidation);
  validation.passes(() => {
    const sql = {
      text: 'SELECT * FROM users WHERE email= $1',
      values: [email],
    };
    user.query(sql, (err, result) => {
      if (result.rows.length > 0) {
        return res.status(409)
          .json({
            error: 'Email already exists',
          });
      }
      bcrypt.hash(password, 10, (err, hash) => {
        const query = {
          text: 'INSERT INTO users(email, name, password, admin) VALUES($1, $2, $3, $4 ) RETURNING *',
          values: [email, name, hash, false],
        };
        user.query(query, (err, result) => {
          if (result.rowCount === 1) {
            const token = jwt.sign({
              id: result.rows[0].id,
              email: result.rows[0].email,
              name: result.rows[0].name,
            }, process.env.JWT_KEY, {
              expiresIn: '1hr',
            });
            res.status(201)
              .json({
                auth: true,
                token,
              })
              .end();
          }
        });
      });
    });
  });
  validation.fails(() => {
    res.status(400).json(validation.errors);
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const validation = new Validator({ password, email }, loginValidation);
  validation.passes(() => {
    const sql = {
      text: 'SELECT * FROM users WHERE email= $1',
      values: [email],
    };
    user.query(sql, (err, result) => {
      if (result && result.rows.length === 1) {
        bcrypt.compare(password, result.rows[0].password, (error, match) => {
          if (match) {
            const token = jwt.sign({
              id: result.rows[0].id,
              admin: result.rows[0].admin,
            }, process.env.JWT_KEY, {
              expiresIn: '1h',
            });
            res.status(200)
              .json({
                auth: true,
                token,
              })
              .end();
          } else {
            res.status(401)
              .json({
                error: 'Login Authentication failed',
              })
              .end();
          }
        });
      } else {
        res.status(401)
          .json({
            error: 'User not found',
          })
          .end();
      }
    });
  });
  validation.fails(() => {
    res.status(400).json(validation.errors);
  });
};

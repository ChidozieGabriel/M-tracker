import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import user from '../models/userModel';

const validateEmail = (email) => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(email);
};
exports.signUp = (req, res) => {
  const { name, email, password } = req.body;
  if (name.trim() === '' || typeof name !== 'string') {
    return res.status(400)
      .json({
        error: 'Name is required and must be a string value',
      });
  } else if (email.trim() === '' || !validateEmail(email)) {
    return res.status(400)
      .json({
        error: 'A valid email is required',
      });
  } else if (password.trim() === '' || password.length >= 8 || password.length <= 4) {
    return res.status(400)
      .json({
        error: 'Password is required and must be less than 8 characters or greater than 4 characters',
      });
  }
  const sql = {
    text: 'SELECT * FROM users WHERE email= $1',
    values: [email],
  };
  user.query(sql, (err, result) => {
    if (err) {
      return res.status(500)
        .json({
          err,
        });
    }
    if (result.rows.length > 0) {
      return res.status(409)
        .json({
          error: 'Email already exists',
        });
    }
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500)
          .json({
            err,
          });
      }
      const query = {
        text: 'INSERT INTO users(email, name, password, admin) VALUES($1, $2, $3, $4 ) RETURNING id',
        values: [email, name, hash, false],
      };
      user.query(query, (err, result) => {
        if (err) {
          return res.status(500)
            .json({
              err,
            });
        }
        if (result.rowCount === 1) {
          const token = jwt.sign({
            id: result.rows[0].id,
            email,
            name,
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
};


exports.login = (req, res) => {
  const { email, password } = req.body;
  if (email.trim() === '' || !validateEmail(email)) {
    return res.status(400)
      .json({
        error: 'A valid email is required',
      });
  } else if (password.trim() === '' || password.length >= 8 || password.length <= 4) {
    return res.status(400)
      .json({
        error: 'Password is required and must be less than 8 characters or greater than 4 characters',
      });
  }
  const sql = {
    text: 'SELECT * FROM users WHERE email= $1',
    values: [email],
  };
  user.query(sql, (err, result) => {
    if (err) {
      return res.status(500)
        .json({
          err,
        })
        .end();
    }
    if (result && result.rows.length === 1) {
      bcrypt.compare(password, result.rows[0].password, (error, match) => {
        if (error) throw error;
        if (match) {
          const token = jwt.sign({
            id: result.rows[0].id,
            email: result.rows[0].email,
            name: result.rows[0].name,
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
          error: 'Login Authentication Failed',
        })
        .end();
    }
  });
};

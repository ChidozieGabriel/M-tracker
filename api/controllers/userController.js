import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import user from '../models/userModel';


exports.signUp = (req, res) => {
  const { name, email, password } = req.body;

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
          message: 'Email already exists',
        });
    }
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500)
          .json({
            err,
          });
      }
      // const password = hash;
      const query = {
        text: 'INSERT INTO users(email, name, password, admin) VALUES($1, $2, $3, $4 )',
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
          // Create token
          const token = jwt.sign({
            email: email,
            name: name,
          }, process.env.JWT_KEY, {
            expiresIn: 86400,
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
  const email = req.body.email;
  const password = req.body.password;

  let sql = {
    text: 'SELECT * FROM users WHERE email= $1',
    values: [email],
  };
  user.query(sql, (err, result) => {
    if (err) {
      res.status(500)
        .json({
          err,
        })
        .end();
    }
    // res.json(result.rows.length);
    if (result && result.rows.length === 1) {
      bcrypt.compare(password, result.rows[0].password, (err, match) => {
        if (match) {
          // Create token
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

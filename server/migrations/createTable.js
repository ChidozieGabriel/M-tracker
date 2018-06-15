import db from '../config/config';


db.query('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(40) NOT NULL, name VARCHAR(40) NOT NULL, password VARCHAR(80), admin BOOLEAN NOT NULL)', (err, res) => {
  if (err) {
    return err;
  }
});


db.query('CREATE TABLE IF NOT EXISTS requests(id SERIAL PRIMARY KEY NOT NULL, user_id INTEGER, requester_name VARCHAR(40) NOT NULL, requester_email VARCHAR(40), date timestamp without time zone, status VARCHAR(20) NOT NULL, request VARCHAR(255) NOT NULL, dept VARCHAR(255))', (err, res) => {
  if (err) {
    return err;
  }
});


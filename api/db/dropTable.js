import db from '../models/userModel';

db.query('DROP TABLE users', (err, res) => {
  if (err) {
    return err;
  }
});

db.query('DROP TABLE requests', (err, res) => {
  if (err) {
    return err;
  }
  db.end();
});

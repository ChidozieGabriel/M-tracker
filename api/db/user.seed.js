import db from '../models/userModel';


const user = {
  text: 'INSERT INTO users(email, name, password, admin) VALUES($1, $2, $3, $4 ) RETURNING id',
  values: ['example@gmail.com', 'Example', '$2b$10$x0yAFrtQxs.f83ZKpb4iM.fwQlLAcc81GDhfDuFUimrNEqEDChXha', false],
};


db.query(user, (err, res) => {
  if (err) {
    return err;
  }
  const request = {
    text: 'INSERT INTO requests(user_id, requester_name, requester_email, date, status, request, dept) VALUES($1, $2, $3, NOW() ,$4, $5, $6)',
    values: [res.rows[0].id, 'example', 'example@gmail.com', 'pending', 'Fix fan', 'Accounts'],
  };
  db.query(request, (err, res) => {
    if (err) {
      return err;
    }
    db.end();
  });
});

import db from '../models/userModel';

const admin = {
  text: 'INSERT INTO users(email, name, password, admin) VALUES($1, $2, $3, $4 ) RETURNING id',
  values: ['admin@admin.com', 'admin', '$2b$10$REyb1K68lujoFHDiHJEeGeKS7BsLwNXw.gTe.0AEYQDEY2M4zSBSu', true],
};

db.query(admin, (err, res) => {
  if (err) {
    return err;
  }
  db.end();
  // const request = {
  //   text: 'INSERT INTO requests(user_id, requester_name, requester_email, date, status, request, dept) VALUES($1, $2, $3, NOW() ,$4, $5, $6)',
  //   values: [res.rows[0].id, 'example', 'example@gmail.com', 'pending', 'Fix fan', 'Accounts'],
  // };
  // db.query(request, (err, res) => {
  //   if (err) {
  //     return err;
  //   }
  //   db.end();
  // });
});


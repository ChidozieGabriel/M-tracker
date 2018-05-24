import db from '../models/userModel';

global.data = [
  {
    id: 110,
    name: 'John doe',
    email: 'example@gmail.com',
    date: '2018-10-13',
    dept: 'Accounts',
    message: 'Lorem ipsum ',
    Url: 'http://localhost:5000/api/v1/users/requests/110',
  },

  {
    id: 120,
    name: 'Jane doe',
    email: 'janedoe@gmail.com',
    date: '2014-1-25',
    dept: 'Engineering',
    message: 'Lorem ipsum Lorem ipsum Lorem',
    Url: 'http://localhost:5000/api/v1/users/requests/120',
  },
  {
    id: 130,
    name: 'Frank Moore',
    email: 'frankmoore@examplemail.me',
    date: '2011-8-1',
    dept: 'Logistics',
    message: 'Lorem ipsum Lorem ipsum Lorem ipsum ',
    Url: 'http://localhost:5000/api/v1/users/requests/130',
  },
];


exports.getAllUserRequests = (req, res) => {
  const userId = req.userInfo.id;
  const sql = {
    text: 'SELECT * FROM requests WHERE user_id=$1',
    values: [userId],
  };
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500)
        .json({
          err,
        }).end();
    }
    res.status(200)
      .json({
        user: req.userInfo,
        result: result.rows,
      });
  });

  // if (global.data.length !== 0) {
  //   return res.status(200)
  //     .json({
  //       status: 'Success',
  //       data: global.data,
  //     });
  // }
  // res.status(204)
  //   .end();
};


exports.getSingleRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  // const sql = {
  //   text: 'SELECT * FROM requests WHERE id=$1',
  //   values: [id],
  // };
  // db.query(sql, (err, result) => {
  //   if (err) {
  //     return res.status(500)
  //       .json({
  //         error: err,
  //       })
  //       .end();
  //   }
  //   if (result.rows.length > 0) {
  //     return res.status(200)
  //       .json({
  //         result: result.rows,
  //       });
  //   }
  //   res.status(404)
  //     .json({
  //       message: 'Record not found',
  //     });
  // });

  for (let i = 0; i < global.data.length; i += 1) {
    if (global.data[i].id === id) {
      return res.status(200)
        .json({
          status: 'Success',
          data: global.data[i],
        });
    }
  }
  res.status(404)
    .json({
      status: 'fail',
      message: 'Not found',
    });
};

exports.createRequest = (req, res) => {
//   const userId = 2;
//   req.body.url = `/api/v1/users/requests/`;
//   const query = {
//     text: 'INSERT INTO requests(user_id, requester_name, requester_email, date, status, request, dept, url, method) VALUES($1, $2, $3, NOW() ,$4, $5, $6, $7, $8)',
//     values: [userId, req.body.name, req.body.email, 'pending', req.body.request, req.body.dept, req.body.url, 'GET'],
//   };
//   db.query(query, (err, result) => {
//     if (err) {
//       return res.status(500)
//         .json({
//           message: `Server Error ${err}`,
//         });
//     }
//     res.status(201)
//       .json({
//         message: 'Request Created successfully',
//       });
//     if (req.body.name && req.body.email === null) {
//       res.status(400)
//         .json({
//           message: 'Bad Request',
//         });
//     }
//   });
// };

  if (typeof req.body.id === 'number') {
    req.body.Url = `/api/v1/users/requests/${req.body.id}`;
    global.data.push(req.body);
    return res.status(201)
      .json({
        status: 'Success',
        message: 'Request Created successfully',
      });
  }
  res.status(400)
    .json({
      status: 'Fail',
      message: 'Bad Request',
    });
};

exports.modifyRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  // const query = {
  //   text: 'INSERT INTO requests(user_id, requester_name, requester_email, date, status, request, dept, url, method) VALUES($1, $2, $3, NOW() ,$4, $5, $6, $7, $8)',
  //   values: [userId, req.body.name, req.body.email, 'pending', req.body.request, req.body.dept, req.body.url, 'GET'],
  // };


  for (let i = 0; i < global.data.length; i += 1) {
    if (global.data[i].id === id) {
      global.data[i].name = req.body.name;
      global.data[i].email = req.body.email;
      global.data[i].date = req.body.date;
      global.data[i].dept = req.body.dept;
      global.data[i].message = req.body.message;
      return res.status(200)
        .json({
          status: 'Success',
          data: global.data[i],
        });
    }
  }
  res.status(404)
    .json({
      status: 'fail',
      message: 'Not found',
    });
};
exports.deleteRequest = (req, res) => {
  const id = parseInt(req.params.requestId, 10);
  for (let i = 0; i < global.data.length; i += 1) {
    if (global.data[i].id === id) {
      global.data.splice(i, 1);
      return res.status(200)
        .json({
          status: 'Success',
          message: 'Request deleted successfully',
        });
    }
  }
  res.status(404)
    .json({
      status: 'Fail',
      message: 'Not found',
    });
};

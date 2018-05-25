'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Pool } from 'pg';

var pool = new _pg2.default.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

// const conString = 'postgres://dgrfjmoh:sQNQ3OS9u5HeX3aiR1T7AYXewkAlgt6x@tantor.db.elephantsql.com:5432/dgrfjmoh';

// 'postgres://DB_Username:PORT@Host/DB_name'

// const pool = new Pg();


// // pool.query('CREATE TABLE testingTable(id SERIAL PRIMARY KEY, firstname VARCHAR(40) NOT NULL,lastName VARCHAR(40) NOT NULL)', (err, result) => {
// pool.query('DROP TABLE testingTable', (err, result) => {
//   if (err) {
//     return console.error('error running query', err);
//   }
//   console.log(result);
//   pool.end();
// });

exports.default = pool;
//# sourceMappingURL=userModel.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var pool = null;

switch (process.env.NODE_ENV) {
  case 'test':
    pool = new _pg.Pool({
      connectionString: process.env.DATABASE_URL
    });
    break;
  case 'localTest':
    pool = new _pg.Pool({
      connectionString: process.env.LOCAL_TEST_DB
    });
    break;

  case 'development':
    pool = new _pg.Pool({
      connectionString: process.env.LOCAL_DB
    });
    break;
  default:
    pool = new _pg.Pool({
      connectionString: process.env.DATABASE_URL
    });
}

exports.default = pool;
//# sourceMappingURL=userModel.js.map
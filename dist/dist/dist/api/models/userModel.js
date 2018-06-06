'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var pool = null;

if (process.env.NODE_ENV === 'test') {
  pool = new _pg.Pool({
    connectionString: process.env.DATABASE_URL
  });
} else if (process.env.NODE_ENV === 'development') {
  pool = new _pg.Pool({
    connectionString: process.env.LOCAL_DB
  });
}

exports.default = pool;
//# sourceMappingURL=userModel.js.map
//# sourceMappingURL=userModel.js.map
//# sourceMappingURL=userModel.js.map
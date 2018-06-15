import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

let pool = null;

switch (process.env.NODE_ENV) {
  case 'test':
    pool = new Pool({
      connectionString: process.env.TEST_DB,
    });
    break;
  case 'development':
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    break;
  default:
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
}

export default pool;

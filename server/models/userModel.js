import { Pool } from 'pg';


let pool = null;

switch (process.env.NODE_ENV) {
  case 'test':
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    break;
  case 'localTest':
    pool = new Pool({
      connectionString: process.env.LOCAL_TEST_DB,
    });
    break;

  case 'development':
    pool = new Pool({
      connectionString: process.env.LOCAL_DB,
    });
    break;
  default:
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
}

export default pool;

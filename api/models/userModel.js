import { Pool } from 'pg';


let pool = null;

if (process.env.NODE_ENV === 'test') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} else if (process.env.NODE_ENV === 'development') {
  pool = new Pool({
    connectionString: process.env.LOCAL_DB,
  });
}


export default pool;

import Pg from 'pg';

const pool = new Pg.Pool({
  user: 'testUser',
  host: 'localhost',
  database: 'test',
  password: '123456',
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

export default pool;

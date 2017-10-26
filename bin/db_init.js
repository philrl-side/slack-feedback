const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/slackfeedback';

const pool = new Pool({connectionString: connectionString});

(async () => {
   const client = await pool.connect();
   await client.query('CREATE TABLE IF NOT EXISTS users (' +
      'id SERIAL PRIMARY KEY, ' +
      'user_name VARCHAR(64) UNIQUE NOT NULL, ' +
      'password VARCHAR(64) NOT NULL)'
  );

  await client.query('CREATE TABLE IF NOT EXISTS tokens (' +
      'token VARCHAR(65) NOT NULL, ' +
      'lastlogin timestamp NOT NULL,' +
      'user_id integer NOT NULL REFERENCES users (id))'
  );

  await client.query('CREATE TABLE IF NOT EXISTS feedback (' +
      'user_id integer NOT NULL REFERENCES users (id), ' +
      'feedback text NOT NULL)'
  );
  client.release()
  await pool.end()

})()

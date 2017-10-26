const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/slackfeedback';

const pool = new Pool({connectionString: connectionString});  

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})


module.exports = {
  query: (text, params) => pool.query(text, params)
}

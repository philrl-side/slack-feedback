const db = require('../helpers/db')

const SET_TOKEN_QUERY = "INSERT INTO tokens (token, user_id, lastlogin) VALUES ($1, $2, NOW())"
const UPDATE_TOKEN_QUERY = "UPDATE tokens SET lastlogin = NOW() WHERE token = $1"
const GET_TOKEN_QUERY = "SELECT * FROM tokens WHERE token = $1 AND user_id = $2 AND (tokens.lastlogin + '4 hours'::interval) > NOW()"


module.exports = {
  set_token: (token, user_id) => {
    return db.query(SET_TOKEN_QUERY, [token, parseInt(user_id, 10)]);
  },

  update_token: (token) => {
    return db.query(UPDATE_TOKEN_QUERY, [token]);
  },

  check_token: (token, user_id) => {
    return db.query(GET_TOKEN_QUERY, [token, parseInt(user_id, 10)]);
  }


}

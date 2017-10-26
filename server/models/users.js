const db = require('../helpers/db')
const bcrypt = require('bcrypt-nodejs')

const LOGIN_QUERY = 'SELECT * FROM users WHERE user_name = $1';
const CREATE_QUERY = 'INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING id';
const GET_USER_QUERY = 'SELECT * FROM users WHERE id = $1';
const GET_USERS_QUERY = 'SELECT * FROM users';

module.exports = {
  login: (username) => {
    return db.query(LOGIN_QUERY, [username]);
  },

  create_user: (username, password) => {
    return db.query(CREATE_QUERY, [username, bcrypt.hashSync(password)]);
  },

  get: (id) => {
    return db.query(GET_USER_QUERY, [id]);
  },

  all_users: () => {
    return db.query(GET_USERS_QUERY);
  }

}

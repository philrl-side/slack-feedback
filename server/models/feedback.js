const db = require('../helpers/db')

const GET_USER_FEEDBACK = 'SELECT * FROM feedback WHERE user_id = $1';
const ADD_USER_FEEDBACK = 'INSERT INTO feedback (user_id, feedback) VALUES ($1, $2)';

module.exports = {
  add_feedback: (user_id, feedback) => {
    return db.query(ADD_USER_FEEDBACK, [user_id, feedback]);
  },

  get_user_feedback: (user_id) => {
    return db.query(GET_USER_FEEDBACK, [user_id]);
  },
}

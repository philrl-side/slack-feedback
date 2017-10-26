const Router = require('express-promise-router');
const feedback = require('../models/feedback');
const tokens = require('../models/tokens');
const slack = require('../services/slack');


const router = new Router();

router.get('/:user', async (req, res) => {
  const { user } = req.params;
  const { token } = req.query;

  const auth = await tokens.check_token(token, user);
  console.log(auth['rows']);
  if(auth['rows'][0] === undefined) {
    res.status(401);
    res.json({});
  } else {
    const { rows } = await feedback.get_user_feedback(user);
    console.log(rows);
    res.json(rows);
  }


});

router.post('/:user', async (req, res) => {
  const { user } = req.params;
  const { token } = req.query;
  const { text } = req.body;

  const auth = await tokens.check_token(token, user);
  console.log(auth['rows']);
  if(auth['rows'][0] === undefined) {
    res.status(401);
    res.json({});
  } else {
    const slack_req = slack.post_to_slack(text)
    const { rows } = await feedback.add_feedback(user, text);
    res.json(rows.map(r => {feedback: r.feedback}));
  }


});

module.exports = router;

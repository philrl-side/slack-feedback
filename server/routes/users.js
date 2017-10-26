const crypto = require('crypto');
const Router = require('express-promise-router')
const bcrypt = require('bcrypt-nodejs')
const users = require('../models/users')
const tokens = require('../models/tokens')


const router = new Router();

router.get('/', async (req, res) => {
  const { rows } = await users.all_users();
  console.log(rows)
  if(rows === undefined) {
    res.json([])
  } else {
    res.json(rows.map(r => {return {username: r['user_name'], id: r['id']}}));
  }

});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const { rows } = await users.login(username, password);
  const login = rows[0]
  if (login !== undefined && bcrypt.compareSync(password, login.password)) {
    user_id = login.id
    const buf = Buffer.alloc(32);
    const token = crypto.randomFillSync(buf).toString('hex');
    await tokens.set_token(token, user_id);
    res.json({
      login: 'successful',
      userid: user_id,
      username: username,
      token: token
    });
  } else {
    res.status(401);
    res.json({
      login: 'failed',
      reason: 'User name and password combination not recognized.'
    });
  }
});

router.post('/create', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const res_promise = async () => {
    const result = await users.create_user(username, password);
    console.log(result);
    const rows = result.rows;
    console.log(rows)
    const { id } = rows[0];
    const buf = Buffer.alloc(32);
    const token = crypto.randomFillSync(buf).toString('hex');
    const token_response = await tokens.set_token(token, id);
    res.json({
      create_user: 'successful',
      userid: id,
      username: username,
      token: token
    });
  }

  res_promise().catch((err) => {
    res.status(400);
    res.json({
      create_user: 'failed',
      reason: err.message
    });
  })

});


module.exports = router;

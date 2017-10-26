const rp = require('request-promise-native');



module.exports = {

  post_to_slack: (text) => {
    const options = {
      method: 'POST',
      uri: 'http://localhost:3001/api/v1/loop',
      body: {
          text: text
      },
      json: true
    };
    return rp(options)
  }
}

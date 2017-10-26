const rp = require('request-promise-native');



module.exports = {

  post_to_slack: (text) => {
    const options = {
      method: 'POST',
      uri: 'https://hooks.slack.com/services/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',
      body: {
          text: text
      },
      json: true
    };
    return rp(options)
  }
}

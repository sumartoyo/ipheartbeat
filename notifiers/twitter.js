var Twitter = require('twitter');

var that = {};

that.notify = function(config, newIp) {
  var notifierConfig = config.notifiers.twitter;
  var client = new Twitter(notifierConfig);
  var params = {
    screen_name: notifierConfig.to_screen_name,
    text: 'IP of '+config.computerName+' is '+newIp,
  };

  console.log('Sending twitter');
  client.post('direct_messages/new', params)
    .then(function(tweet) {
      console.log('Twitter sent');
    })
    .catch(function(error) {
      console.log('[Twitter]', error);
    })
};

module.exports = that;

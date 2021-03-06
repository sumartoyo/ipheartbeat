var axios = require('axios');

var that = {};

that.config = require('./config');
that.currentIp = '127.0.0.1';

that.checkIp = function() {
  console.log('Getting IP');
  axios.get('https://api.ipify.org?format=json')
    .then(function(response) {
      if ('data' in response && 'ip' in response.data) {
        if (response.data.ip !== that.currentIp) {
          that.currentIp = response.data.ip;
          console.log('IP has changed to '+that.currentIp);
          that.onIpDidChange();
        } else {
          console.log('IP is still '+that.currentIp);
        }
      }
      that.recheckIp();
    })
    .catch(function(error) {
      console.log('[ipify]', error);
      that.recheckIp();
    });
};

that.recheckIp = function() {
  setTimeout(that.checkIp, that.config.checkInterval);
};

that.onIpDidChange = function() {
  that.notifiers.forEach(function(notifier) {
    try {
      notifier.notify(that.config, that.currentIp);
    } catch (error) {
      console.log(error);
    }
  });
};

that.loadNotifiers = function() {
  that.notifiers = Object.keys(that.config.notifiers)
    .map(function(notifierName) {
      return require('./notifiers/'+notifierName);
    });
};

that.start = function() {
  that.loadNotifiers();
  that.checkIp();
};

if (require.main === module) {
  that.start();
}

module.exports = that;

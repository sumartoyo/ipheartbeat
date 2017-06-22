var axios = require('axios');
var nodemailer = require('nodemailer');

var that = {};

that.config = require('./config');
that.currentIp = '127.0.0.1';

that.run = function() {
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
      that.rerun();
    })
    .catch(function(error) {
      console.log('[ipify]', error);
      that.rerun();
    });
};

that.rerun = function() {
  setTimeout(that.run, that.config.checkInterval);
};

that.onIpDidChange = function() {
  var transporter = nodemailer.createTransport(that.config.mail);
  var mailOptions = {
    from: that.config.mail.from,
    to: that.config.mail.to,
    subject: 'IP change of '+that.config.computerName,
    text: that.currentIp,
  };
  console.log('Sending mail');
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('[sendMail]', error);
    }
    console.log('Mail sent', { messageId: info.messageId, response: info.response });
  });
};

if (require.main === module) {
  that.run();
}

module.exports = that;

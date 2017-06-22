var nodemailer = require('nodemailer');

var that = {};

that.notify = function(config, newIp) {
  var notifierConfig = config.notifiers.mail;
  var client = nodemailer.createTransport(notifierConfig);
  var params = {
    from: notifierConfig.from,
    to: notifierConfig.to,
    subject: 'IP change of '+config.computerName,
    text: newIp,
  };

  console.log('Sending email');
  client.sendMail(params, (error, info) => {
    if (error) {
      return console.log('[Email]', error);
    }
    console.log('Email sent', { messageId: info.messageId, response: info.response });
  });
};

module.exports = that;

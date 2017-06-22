module.exports = {
  computerName: 'My Computer',
  checkInterval: 600 * 1000, // in milliseconds

  notifiers: {
    twitter: {
      consumer_key: 'my_consumer_key',
      consumer_secret: 'my_consumer_secret',
      access_token_key: 'my_access_token_key',
      access_token_secret: 'my_access_token_secret',
      to_screen_name: 'my_username',
    },

    // uncomment to notify via email
    /*
    email: {
      host: 'smtp.example.com',
      port: 465,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
        user: 'username@example.com',
        pass: 'userpass',
      },
      from: 'username@example.com',
      to: 'me@example.com',
    },
    */
  },
};

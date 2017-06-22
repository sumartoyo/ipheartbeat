module.exports = {
  computerName: 'My Computer',
  checkInterval: 600 * 1000, // in milliseconds
  mail: {
    host: 'smtp.example.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      user: 'username@example.com',
      pass: 'userpass',
    },
    from: 'username@example.com',
    to: 'me@example.com',
  }
}

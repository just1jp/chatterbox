var db = require('../db');

db.connection.connect();

var query = function(command, callback) {
  db.connection.query(command, function(err, results) {
    if (err) {
      throw err; 
    } else {
      callback(results);
    }
  });
};

var currentTime = new Date();
currentTime = currentTime.toISOString();

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function ({username, message, roomname}) {
      var keys = '(user, message, room, createdAt)';
      var values = `(${username}, ${message}, ${roomname}, ${createdAt})`;
      var command = `INSERT INTO messages ${keys} values ${values}`;
      query(command, function(results) {
        console.log(results);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    get: function () {
      query('select * from users', function(results) {
        console.log(results);
      });
    },
    post: function (user) {
      var call = 'INSERT INTO users (name) values ("' + user + '")';
      query(call, function(results) {
        console.log(results);
      });
    }
  }
};  

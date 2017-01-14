var db = require('../db');
var request = require('request');

request({
  method: 'POST',
  uri: 'http://127.0.0.1:3000/classes/users',
  json: {
    username: 'Valjean'
  }
});

request({
  method: 'POST',
  uri: 'http://127.0.0.1:3000/classes/messages',
  json: {
    username: 'Valjean',
    message: 'In mercy\'s name, three days is all I need.',
    roomname: 'Hello'
  }
});

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

var getTime = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getTime();
  var hours = date.getHours();
  var mins = date.getMinutes();
  var secs = date.getSeconds();

  console.log(year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + secs);
};

// INSERT INTO messages (user, message, room, createdAt) values ((select id from users where name = "derek"), 
//"In mercy's name, three days is all I need.", "Hello", "2017-01-14 04:22:12");

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (message) {
      console.log(message);
      var keys = '(user, message, room, createdAt)';
      var getUserID = `(select id from users where name = "${message.username}")`;
      var values = `(${getUserID}, "${message.message}", "${message.roomname}", "2017-01-14 04:22:12")`;
      var command = `INSERT INTO messages ${keys} values ${values}`;
      console.log('command', command);

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

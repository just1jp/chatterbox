var db = require('../db');
var request = require('request');
var date = require('date-and-time');
var Promise = require('bluebird');

db.connection.connect();

var query = function(command, callback) {
  db.connection.query(command, function(err, results) {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.log(err.code);
        callback(results);
      } else {
        throw err;
      }
    } else {
      callback(results);
    }
  });
};

var dateTime = function() {
  return date.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
};

// INSERT INTO messages (user, message, room, createdAt) values ((select id from users where name = "derek"), 
//"In mercy's name, three days is all I need.", "Hello", "2017-01-14 04:22:12");

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (res) {
      query('select * from messages', function(results) {
        console.log('message get ', results);
        res.end(JSON.stringify(results));
      });
    },
    post: function (message, res) {
      var keys = '(user, message, room, createdAt)';
      var values = `("${message.user}", "${message.message}", "${message.roomname}", "${dateTime()}")`;
      var command = `INSERT INTO messages ${keys} values ${values}`;

      var userPost = Promise.promisify(module.exports.users.post);
      userPost(message.user).then(
        query(command, function(results) {
          console.log('message post ', results);
          res.end();
        })
      );
    }
  },

  users: {
    get: function (res) {
      query('select * from users', function(results) {
        console.log('user get ', results);
        res.end(JSON.stringify(results));
      });
    },
    post: function (user) {
      var call = 'INSERT INTO users (name) values ("' + user + '")';
      query(call, function(results) {
        console.log('user results ', results);
      });
    }
  }
};  
















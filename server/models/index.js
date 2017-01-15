var db = require('../db');
var request = require('request');
var date = require('date-and-time');
var Promise = require('bluebird');

var dateTime = function() {
  return date.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
};

// INSERT INTO messages (user, message, room, createdAt) values ((select id from users where name = "derek"), 
//"In mercy's name, three days is all I need.", "Hello", "2017-01-14 04:22:12");

module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (res) {
      db.messages.findAll()
        .then(function(results) {
          res.end(JSON.stringify(results));
        });
    },
    post: function (message, res) {
      db.users.find({
        where: {
          name: message.user
        }
      }).then((user) => {
        if (!user) {
          db.users.create({
            name: message.user
          })
          .then(() => {
            db.messages.create({
              message: message.message,
              room: message.room,
              userName: message.user
            }).then(function(results) {
              res.end(JSON.stringify(results));
            });
          });
        } else {
          db.messages.create({
            message: message.message,
            room: message.room,
            userName: message.user
          }).then(function(results) {
            res.end(JSON.stringify(results));
          });
        }
      });

      
    }
  },

  users: {
    get: function (user) {
      db.users.find(user)
        .then(function(err, results) {
          console.log('users get ', results);
          res.end(JSON.stringify(results));
        });
    },
    post: function (user) {
      db.users.create({
        name: user
      }).then(function(results) {
        console.log('message post ', results);
      });
    }
  }
};  
















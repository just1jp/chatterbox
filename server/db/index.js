var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'root', '');

var users = sequelize.define('users', {
  name: {
    type: Sequelize.STRING,
    primaryKey: true
  }
});

var messages = sequelize.define('messages', {
  // user: {
  //   type: Sequelize.STRING,
  //   model: 'users',
  //   key: 'name'
  // },
  message: Sequelize.STRING,
  room: Sequelize.STRING
});

users.hasMany(messages);
messages.belongsTo(users);

users.sync();
messages.sync();

exports.messages = messages;
exports.users = users;
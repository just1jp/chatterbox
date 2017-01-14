var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(res);
    },
    post: function (req, res) {
      models.messages.post(req.body);
      res.end();
    }
  },

  users: {
    get: function (req, res) {
      models.users.get(res);
    },
    post: function (req, res) {
      models.users.post(req.body.username);
      res.end();
    }
  }
};
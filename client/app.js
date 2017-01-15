var app = {};

$(document).ready(function() {
  var ChatterBox = function() {
    this.server = 'http://127.0.0.1:3000/classes/messages';
    this.friends = [];
  };

  ChatterBox.prototype.init = function () {
    this.fetch();
    var context = this;

    //Chat Room drop-down menu
    $('#roomSelect').on('change', function(e) {
      context.clearMessages();
      context.fetch();
    });

    //On click of the Submit button
    $('#submit-message').on('click', function(e) {
      var text = $(this).parent().find('input[name="message"]').val();
      var username = window.location.search;
      username = username.substring(username.indexOf('=') + 1, username.length);
      var roomname = $('#roomSelect').find(':selected').text();
      var message = {
        user: username,
        message: text,
        roomname: roomname
      };

      context.send(message);
      $('#submit-text').val('');
    });

    //To 'friend' someone...
    $('.messages').on('click', 'span', function() {
      var classes = $(this).removeClass('friend').attr('class');
      context.handleUsernameClick(classes);
      context.fetch();
    });

    //Create room button
    $('#create-room').on('click', function() {
      $(this).hide();
      $('#create-room-text').show();
    });

    //Upon submission of the new room
    $('#room-submit').on('click', function() {
      var newRoom = $('#create-room-text').val();
      context.renderRoom({roomname: newRoom});
      $('#create-room-text').val('').hide();
      $('#create-room').show();
      $('#roomSelect option[value="' + newRoom + '"]').attr('selected', 'selected');
      context.fetch();
    });

  };

  ChatterBox.prototype.send = function (message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        this.fetch();
        console.log('chatterbox: Message sent');
      }.bind(this),
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };

  ChatterBox.prototype.fetch = function () {
    var room = $('#roomSelect').find(':selected').text();
    var options = {'maxResults': 5};
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      data: options,
      success: function (response) {
        var data = JSON.parse(response);
        this.clearMessages();
        for (var i = data.length - 1; i >= 0; i--) {
          if (room === 'All' || this.escapeHtml(data[i].room) === room) {
            this.renderMessage(data[i]);
          }
          this.renderRoom(data[i]);
        }
      }.bind(this),
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch', data);
      }
    });
  };

  ChatterBox.prototype.clearMessages = function () {
    $('.messages > li').remove();
  };

  ChatterBox.prototype.renderMessage = function (message) {
    var created = new Date(message.createdAt);
    var month = created.getMonth() + 1;
    var day = created.getDate();
    var year = created.getFullYear();
    var hours = ('0' + created.getHours()).slice(-2);
    var mins = ('0' + created.getMinutes()).slice(-2);
    var seconds = ('0' + created.getSeconds()).slice(-2);

    var username = this.escapeHtml(message.userName);
    var timeStamp = month + '/' + day + '/' + year + ' ' + hours + ':' + mins + ':' + seconds;
    var user = $('<span></span>').append(username + ' foretold: ');
    var text = $('<span></span>').append(this.escapeHtml(message.message));
    var time = $('<span></span>').append(timeStamp);
    var listItem = $('<li></li>');

    user.addClass(username.replace(/ /g, '__'));
    if (this.friends.indexOf(username.replace(/ /g, '__')) >= 0) {
      user.addClass('friend');
      listItem.addClass('friend-box');
    }
    listItem.append(user).append(text).append(time);
    $('.messages').prepend(listItem);
  };

  ChatterBox.prototype.renderRoom = function (message) {
    var currentRoom = this.escapeHtml(message.room);
    var rooms = $('#roomSelect').children('option');

    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].value === currentRoom || currentRoom.includes('script') || currentRoom.includes('&quot')) {
        return;
      }
    }
    $('#roomSelect').append('<option value="' + currentRoom + '">' + currentRoom + '</option>');
  };

  ChatterBox.prototype.escapeHtml = function (string) {
    var entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;'
    };

    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    }).replace(/%20/g, ' ');
  };

  ChatterBox.prototype.handleUsernameClick = function (username) {
    var index = this.friends.indexOf(username);
    $('.' + username).toggleClass('friend');
    $('.' + username).parent().toggleClass('friend-box');

    if (index >= 0) {
      this.friends.splice(index, 1);
    } else {
      this.friends.push(username);
    }
  };

  app = new ChatterBox();
  app.init();
  //setInterval(app.fetch.bind(app), 2000);

});

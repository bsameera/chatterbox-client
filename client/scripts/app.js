// YOUR CODE HERE:
var app = { 
  init: function() {},
  send: function(message) {
    $.ajax({
      type: 'POST',
      url: 'http://parse.hrsf.hackreactor.com/chatterbox/classes/messages',
      data: JSON.stringify(message),
      contentType: 'application/json'
    });
  },
  fetch: function() {
    $.ajax({
      type: 'GET',
      server: 'http://parse.hrsf.hackreactor.com/chatterbox/classes/messages',
      contentType: 'application/json'
    });
  }

};





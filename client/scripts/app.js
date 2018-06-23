class App {

  constructor() {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  }

  init() {
    this.fetch();
  }

  send(message) {
    $.ajax({
      type: 'POST',
      url: this.server,
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }

  
  fetch(message) {
    // console.log('this is', this.renderMessage);
    var render = this.renderMessage;

    $.ajax({
      type: 'GET',
      url: this.server,
      contentType: 'application/json',
      data: JSON.stringify(message),
      success: function (data) {
        console.log('chatterbox: Message fetched', data);
        // this.messages = data.results;
        for (var i = 0; i < data.results.length; i++) {
          //console.log(data.results[i]);

          render(data.results[i]);
        }    
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to get message', data);
      }
    });
  }

  clearMessages() {
    $('#chats').children().remove();
  }
  
  renderMessage(message) {
    let userName = message.username;
    let userText = message.text;
    let roomName = message.roomname;
    let appendingText = `<div><h1>${userName}</h1><p>${userText}</p><p>${roomName}</p></div>`; 
    $( '#chats' ).append(appendingText);
  }

  renderRoom(roomName) {
    $('#roomSelect').append(`<div>${roomName}</div>`);
  }

  handleUsernameClick() {
    
  }

  // fetchData(property) {
  //   let dataArray = [];
  //   let data = this.fetch(); //array of 100 obj
  //   //
  // }
  
}

$(document).ready(function () {
  var app = new App();
  app.init();
});







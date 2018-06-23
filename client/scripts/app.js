$(document).ready(function () {

});

class App {

  constructor() {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  }

  init() {}

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
    $.ajax({
      type: 'GET',
      url: this.server,
      contentType: 'application/json',
      data: JSON.stringify(message),
      success: function (data) {
        console.log('chatterbox: Message fetched', data);
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
  
}

const app = new App();







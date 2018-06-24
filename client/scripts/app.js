class App {

  constructor() {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
    this.user = prompt('What is your name?'); 
    this.entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;',
      '%': '&percnt',
      '!': '&excl',
      '@': '&commat',
      '$': '&dollar',
      '(': '&lpar',
      ')': '&rpar',
      '+': '&plus',
      '{': '&lcub',
      '}': '&rcub',
      '[': '&lsqb',
      ']': '&rsqb'
    };
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
    let renderText = this.renderMessage;
    let renderRooms = this.renderRoom;

    $.ajax({
      type: 'GET',
      url: this.server,
      contentType: 'application/json',
      data: JSON.stringify(message),
      success: function (data) {
        console.log('chatterbox: Message fetched', data);
        let roomSet = new Set();
        for (let i = 0; i < data.results.length; i++) {
          roomSet.add(data.results[i].roomname);
          renderText(data.results[i]);
        }
        for (let item of roomSet) {
          renderRooms(item);
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
    let appendingText = `<div class='tweet'><h2 class='userName'>${userName}</h2><p class='userText'>${userText}</p></div>`; 
    $( '#chats' ).append(appendingText);
  }

  renderRoom(roomName) {
    $('#roomSelect').append(`<option>${roomName}</option>`);
  }

  handleUsernameClick() {
    
  }

  escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
      return this.entityMap[s];
    });
  }
}

$(document).ready(function () {

  app.init();

  $('.submit').on('click', function(){
    let textMessage = $('.textBox').val();
    let newMessage = {
      username: app.user,
      text: textMessage
    };
    app.send(newMessage);
    app.fetch();
  });

});

var app = new App();




